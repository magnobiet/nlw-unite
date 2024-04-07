import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { http } from '../../lib/axios';
import { dayjs } from '../../lib/dayjs';
import { IconButton } from '../icon-button';
import { Table } from '../table';
import { TableCell } from '../table/table-cell';
import { TableHeader } from '../table/table-header';
import { TableRow } from '../table/table-row';

type Attendee = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  checkInAt: string;
};

export function AttendeeList(): ReactElement {
  const [query, setQuery] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has('query')) {
      return url.searchParams.get('query') ?? '';
    }

    return '';
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'));
    }

    return 1;
  });
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [attendees, setAttendees] = useState<Array<Attendee>>([]);

  useEffect(() => {
    const endpoint = `/events/f3bc91f6-602b-4c50-814a-1b5ab885d992/attendees?page=${page}${query ? `&query=${query}` : ''}`;

    http.get(endpoint).then(({ data, headers }) => {
      setTotalPages(Number(headers.get('X-Pagination-Total-Pages')));
      setTotalItems(Number(headers.get('X-Pagination-Total-Items')));

      setAttendees(data);
    });
  }, [page, query]);

  function setCurrentQuery(query: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set('query', query);

    window.history.pushState({}, '', url);

    setQuery(query);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set('page', String(page));

    window.history.pushState({}, '', url);

    setPage(page);
  }

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentQuery(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToNextPage() {
    if (page >= totalPages) {
      return;
    }

    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    if (page <= 1) {
      return;
    }

    setCurrentPage(page - 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <form>
          <div className="px-3 py-1.5 border border-white/10 rounded-lg text-sm w-72 flex items-center gap-3">
            <MagnifyingGlassIcon className="size-4 text-emerald-300" />

            <input
              type="text"
              className="flex-1 outline-none bg-transparent h-auto p-0 border-0 text-sm ring-0 focus:ring-0"
              placeholder="Buscar participante"
              onChange={onSearchInputChanged}
              value={query}
            />
          </div>
        </form>
      </div>

      <Table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader className="w-12">
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400"
              />
            </TableHeader>

            <TableHeader>Código</TableHeader>

            <TableHeader>Participante</TableHeader>

            <TableHeader>Data de inscrição</TableHeader>

            <TableHeader>Data do check-in</TableHeader>

            <TableHeader className="w-16"></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.map(({ id, name, email, createdAt, checkInAt }, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400"
                  />
                </TableCell>

                <TableCell>{id}</TableCell>

                <TableCell>
                  <span className="flex flex-col ga-1">
                    <span className="font-semibold text-white">{name}</span>
                    <span>{email}</span>
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    title={dayjs(createdAt).format('DD/MM/YYYY - HH:mm:ss')}
                  >
                    {dayjs().to(createdAt)}
                  </span>
                </TableCell>

                <TableCell>
                  {!checkInAt ? (
                    'Não fez check-in'
                  ) : (
                    <span
                      title={dayjs(checkInAt).format('DD/MM/YYYY - HH:mm:ss')}
                    >
                      {dayjs().to(checkInAt)}
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <IconButton transparent>
                    <DotsHorizontalIcon className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>

        <tfoot>
          <TableRow isFooter>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {totalItems} itens
            </TableCell>

            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex items-center gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <DoubleArrowLeftIcon className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeftIcon className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRightIcon className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <DoubleArrowRightIcon className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </section>
  );
}
