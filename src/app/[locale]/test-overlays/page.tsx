'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Drawer } from '@/components/ui/drawer';
import { Popover } from '@/components/ui/popover';
import { Tooltip } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export default function TestOverlays() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { addToast } = useToast();
  const [unmountTooltipContainer, setUnmountTooltipContainer] = useState(false);

  let _locale = 'de' as string;
  return (
    <div className="p-8 space-y-8" style={{ paddingBottom: '200vh' }}>
      \n <h1 className="text-2xl font-bold">Overlay Tests</h1>
      <section>
        <h2>Modal Test</h2>
        <button id="open-modal" onClick={() => setModalOpen(true)} className="border p-2">
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Test Modal">
          <p>Modal content</p>
        </Modal>
      </section>
      <section>
        <h2>Drawer Test</h2>
        <button id="open-drawer" onClick={() => setDrawerOpen(true)} className="border p-2">
          Open Drawer
        </button>
        <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Test Drawer">
          <p>Drawer content</p>
        </Drawer>
      </section>
      <section>
        <h2>Popover Test</h2>
        <Popover
          trigger={
            <button id="popover-trigger" className="border p-2">
              Toggle Popover
            </button>
          }
          content={<div id="popover-content">Popover Content</div>}
        />
      </section>
      <section>
        <h2>Tooltip Test</h2>
        {!unmountTooltipContainer && (
          <Tooltip content="Tooltip 1">
            <button id="tooltip-1" className="border p-2 mr-4">
              Hover me 1
            </button>
          </Tooltip>
        )}
        <Tooltip content="Tooltip 2">
          <button id="tooltip-2" className="border p-2 mr-4">
            Hover me 2
          </button>
        </Tooltip>

        <button
          id="unmount-tooltip"
          onClick={() => setUnmountTooltipContainer(true)}
          className="border p-2 text-red-500"
        >
          Unmount Tooltip 1
        </button>
      </section>
      <section>
        <h2>Toast Test</h2>
        <button
          id="show-toast"
          onClick={() => addToast({ title: 'Test', type: 'success' })}
          className="border p-2"
        >
          Show Toast
        </button>
      </section>
      <Toaster />
    </div>
  );
}
