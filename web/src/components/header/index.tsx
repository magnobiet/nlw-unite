import { CodeIcon } from '@radix-ui/react-icons';
import { ReactElement } from 'react';
import { NavLink } from '../nav-link';

export function Header(): ReactElement {
  return (
    <header className="flex items-center gap-5 py-2">
      <span className="inline-flex justify-center items-center w-8 h-8 rounded p-1 bg-orange-400">
        <CodeIcon className="text-slate-950" />
      </span>

      <nav className="flex items-center gap-5">
        <NavLink href="/events">Eventos</NavLink>

        <NavLink href="/attendees" active={true}>
          Participantes
        </NavLink>
      </nav>
    </header>
  );
}
