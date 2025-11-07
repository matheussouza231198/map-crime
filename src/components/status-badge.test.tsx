import type { ReportStatus } from '@/interfaces/report';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './status-badge';

describe('StatusBadge', () => {
  it('should render badge with "Pendente" status', () => {
    render(<StatusBadge status="pendente" />);
    const badge = screen.getByText('Pendente');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('should render badge with "Em Andamento" status', () => {
    render(<StatusBadge status="em_andamento" />);
    const badge = screen.getByText('Em Andamento');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('should render badge with "Resolvido" status', () => {
    render(<StatusBadge status="resolvido" />);
    const badge = screen.getByText('Resolvido');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('should render badge with "Rejeitado" status', () => {
    render(<StatusBadge status="rejeitado" />);
    const badge = screen.getByText('Rejeitado');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('should apply correct classes for each status', () => {
    const statuses: Array<{ status: ReportStatus; label: string; colorClass: string }> = [
      { status: 'pendente', label: 'Pendente', colorClass: 'text-yellow-800' },
      { status: 'em_andamento', label: 'Em Andamento', colorClass: 'text-blue-800' },
      { status: 'resolvido', label: 'Resolvido', colorClass: 'text-green-800' },
      { status: 'rejeitado', label: 'Rejeitado', colorClass: 'text-red-800' },
    ];

    statuses.forEach(({ status, label, colorClass }) => {
      const { unmount } = render(<StatusBadge status={status} />);
      const badge = screen.getByText(label);
      expect(badge).toHaveClass(colorClass);
      expect(badge).toHaveClass('font-semibold');
      unmount();
    });
  });

  it('should always have outline variant and font-semibold classes', () => {
    render(<StatusBadge status="pendente" />);
    const badge = screen.getByText('Pendente');
    expect(badge).toHaveClass('font-semibold');
  });
});
