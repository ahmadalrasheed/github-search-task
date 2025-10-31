import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';
import { useState } from 'react';

describe('SearchInput', () => {
  it('should render with default placeholder', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('should render with custom placeholder', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} placeholder="Search repositories..." />);

    expect(screen.getByPlaceholderText('Search repositories...')).toBeInTheDocument();
  });

  it('should display the current value', () => {
    const onChange = vi.fn();
    render(<SearchInput value="test query" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test query');
  });

  it('should call onChange when user types', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
        />
      );
    };
    
    render(<TestComponent />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenNthCalledWith(1, 'h');
    expect(onChange).toHaveBeenNthCalledWith(2, 'he');
    expect(onChange).toHaveBeenNthCalledWith(3, 'hel');
    expect(onChange).toHaveBeenNthCalledWith(4, 'hell');
    expect(onChange).toHaveBeenNthCalledWith(5, 'hello');
  });

  it('should be disabled when disabled prop is true', () => {
    const onChange = vi.fn();
    render(<SearchInput value="test" onChange={onChange} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should have correct disabled styling when disabled', () => {
    const onChange = vi.fn();
    render(<SearchInput value="test" onChange={onChange} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('disabled:bg-gray-50', 'disabled:cursor-not-allowed');
  });

  it('should render search icon', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should have focus styles', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('focus:ring-2', 'focus:ring-blue-500');
  });

  it('should handle empty value', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('should handle special characters', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            onChange(newValue);
          }}
        />
      );
    };
    
    render(<TestComponent />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(lastCall[0]).toBe('test@example.com');
  });
});
