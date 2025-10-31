import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { TypeSelector } from '../TypeSelector';

describe('TypeSelector', () => {
  it('should render both type options', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Repositories')).toBeInTheDocument();
  });

  it('should show selected type', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    const repositoriesButton = screen.getByRole('button', { name: /Repositories/i });
    expect(repositoriesButton).toHaveClass('border-blue-500', 'bg-blue-50', 'text-blue-700');
  });

  it('should call onTypeChange when clicking a type', async () => {
    const user = userEvent.setup();
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    const usersButton = screen.getByRole('button', { name: /Users/i });
    await user.click(usersButton);

    expect(onTypeChange).toHaveBeenCalledWith('users');
  });

  it('should not change when clicking the already selected type', async () => {
    const user = userEvent.setup();
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    const repositoriesButton = screen.getByRole('button', { name: /Repositories/i });
    await user.click(repositoriesButton);

    expect(onTypeChange).toHaveBeenCalledWith('repositories');
  });

  it('should be disabled when disabled prop is true', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('should show visual indicator for selected type', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="users" onTypeChange={onTypeChange} />);

    const usersButton = screen.getByRole('button', { name: /Users/i });
    expect(usersButton).toHaveClass('border-blue-500');
  });

  it('should show hover styles for non-selected type', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    const usersButton = screen.getByRole('button', { name: /Users/i });
    expect(usersButton).toHaveClass('hover:border-gray-400', 'hover:bg-gray-50');
  });

  it('should display descriptions', () => {
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    expect(screen.getByText('Search for GitHub users')).toBeInTheDocument();
    expect(screen.getByText('Search for GitHub repositories')).toBeInTheDocument();
  });

  it('should handle rapid type switching', async () => {
    const user = userEvent.setup();
    const onTypeChange = vi.fn();
    render(<TypeSelector selectedType="repositories" onTypeChange={onTypeChange} />);

    const usersButton = screen.getByRole('button', { name: /Users/i });
    const reposButton = screen.getByRole('button', { name: /Repositories/i });

    await user.click(usersButton);
    expect(onTypeChange).toHaveBeenCalledWith('users');

    await user.click(reposButton);
    expect(onTypeChange).toHaveBeenCalledWith('repositories');

    expect(onTypeChange).toHaveBeenCalledTimes(2);
  });
});

