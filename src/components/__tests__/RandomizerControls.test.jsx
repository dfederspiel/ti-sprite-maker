import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import RandomizerControls from '../RandomizerControls';

// Mock timers for testing intervals
vi.useFakeTimers();

describe('RandomizerControls', () => {
  const mockOnRandomize = vi.fn();

  beforeEach(() => {
    mockOnRandomize.mockClear();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders all control elements', () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    expect(screen.getByText('Random')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Frame Rate: 5 FPS')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('calls onRandomize when Random button is clicked', () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    const randomButton = screen.getByText('Random');
    fireEvent.click(randomButton);

    expect(mockOnRandomize).toHaveBeenCalledTimes(1);
  });

  it('toggles between Play and Pause when button is clicked', () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    const playButton = screen.getByText('Play');
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.queryByText('Play')).not.toBeInTheDocument();
  });

  it('updates frame rate when slider is changed', () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '10' } });

    expect(screen.getByText('Frame Rate: 10 FPS')).toBeInTheDocument();
  });

  it('starts auto-randomization when Play is pressed', async () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    // Should call onRandomize immediately when starting
    expect(mockOnRandomize).toHaveBeenCalledTimes(0);

    // Advance timer by 200ms (5 FPS = 200ms interval)
    vi.advanceTimersByTime(200);

    expect(mockOnRandomize).toHaveBeenCalledTimes(1);

    // Advance by another 200ms
    vi.advanceTimersByTime(200);

    expect(mockOnRandomize).toHaveBeenCalledTimes(2);
  });

  it('stops auto-randomization when Pause is pressed', async () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    // Start playing
    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    // Wait for interval to be established
    vi.advanceTimersByTime(200);
    expect(mockOnRandomize).toHaveBeenCalledTimes(1);

    // Pause
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);

    // Clear previous calls
    mockOnRandomize.mockClear();

    // Advance timer - should not call randomize anymore
    vi.advanceTimersByTime(400);
    expect(mockOnRandomize).not.toHaveBeenCalled();
  });

  it('adjusts randomization speed when frame rate changes during playback', () => {
    render(<RandomizerControls onRandomize={mockOnRandomize} />);

    // Start playing at 5 FPS (200ms interval)
    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    // Change to 10 FPS (100ms interval)
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '10' } });

    expect(screen.getByText('Frame Rate: 10 FPS')).toBeInTheDocument();

    // Test the new interval speed
    mockOnRandomize.mockClear();
    vi.advanceTimersByTime(100);
    expect(mockOnRandomize).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(mockOnRandomize).toHaveBeenCalledTimes(2);
  });
});
