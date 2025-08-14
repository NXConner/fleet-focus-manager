import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock heavy map widget
vi.mock('@/components/dashboard/GPSMapWidget', () => ({ default: () => null }));

// Mock Supabase client globally for this test to avoid requiring real keys
vi.mock('@/integrations/supabase/client', () => {
  const stub = {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
      update: vi.fn().mockResolvedValue({ data: null, error: null }),
      delete: vi.fn().mockResolvedValue({ data: null, error: null }),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    storage: {
      from: vi.fn(() => ({
        download: vi.fn().mockResolvedValue({ data: new Blob(), error: null }),
      })),
    },
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn(() => ({ unsubscribe: vi.fn() })),
    })),
  };
  return { supabase: stub };
});

describe('App', () => {
  it('renders without crashing and shows main header', async () => {
    const { default: App } = await import('@/App');
    render(<App />);
    expect(screen.getByText(/Fleet & Equipment Management System/i)).toBeInTheDocument();
  });
});