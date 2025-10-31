import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import { RepositoryCard } from '../RepositoryCard';
import { createMockRepository } from '@/test/utils';
import * as formatters from '@/utils/formatters';

describe('RepositoryCard', () => {
  it('should render repository name', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    const heading = screen.getByRole('heading', { name: repository.name });
    expect(heading).toBeInTheDocument();
  });

  it('should render repository owner', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(repository.owner.login)).toBeInTheDocument();
  });

  it('should render repository description', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(repository.description!)).toBeInTheDocument();
  });

  it('should render primary language badge', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(repository.language!)).toBeInTheDocument();
  });

  it('should not render language badge when language is null', () => {
    const repository = { ...createMockRepository(), language: undefined };
    render(<RepositoryCard repository={repository} />);

    expect(screen.queryByText(/TypeScript/)).not.toBeInTheDocument();
  });

  it('should render repository statistics', () => {
    const repository = createMockRepository();
    const formatSpy = vi.spyOn(formatters, 'formatNumber');
    
    render(<RepositoryCard repository={repository} />);

    expect(formatSpy).toHaveBeenCalled();
  });

  it('should render fork badge when repository is a fork', () => {
    const repository = { ...createMockRepository(), fork: true };
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText('Fork')).toBeInTheDocument();
  });

  it('should not render fork badge when repository is not a fork', () => {
    const repository = { ...createMockRepository(), fork: false };
    render(<RepositoryCard repository={repository} />);

    expect(screen.queryByText('Fork')).not.toBeInTheDocument();
  });

  it('should render updated date', () => {
    const repository = createMockRepository();
    const formatDateSpy = vi.spyOn(formatters, 'formatDate');
    
    render(<RepositoryCard repository={repository} />);

    expect(formatDateSpy).toHaveBeenCalledWith(repository.updated_at);
  });

  it('should render license when available', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(repository.license!.name)).toBeInTheDocument();
  });

  it('should not render license when not available', () => {
    const repository = { ...createMockRepository(), license: undefined };
    render(<RepositoryCard repository={repository} />);

    expect(screen.queryByText('MIT License')).not.toBeInTheDocument();
  });

  it('should render ForksPopover component', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText(/View Latest Forks/)).toBeInTheDocument();
  });

  it('should render "see more" link for languages', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    expect(screen.getByText('see more')).toBeInTheDocument();
  });

  it('should have external link to repository', () => {
    const repository = createMockRepository();
    render(<RepositoryCard repository={repository} />);

    const link = screen.getByRole('link', { name: repository.name });
    expect(link).toHaveAttribute('href', repository.html_url);
    expect(link).toHaveAttribute('target', '_blank');
  });
});

