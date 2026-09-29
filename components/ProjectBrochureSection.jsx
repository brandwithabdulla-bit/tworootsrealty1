'use client';

import { useState } from 'react';
import { ArrowUpRight } from './ui';
import BrochureModal from './BrochureModal';

export default function ProjectBrochureSection({ item, project }) {
  const target = item || project || {};
  const [modalOpen, setModalOpen] = useState(false);

  if (!target || !target.title) return null;

  return (
    <div className="document-row real-brochure-row">
      <div>
        <h3>Official Project Documentation</h3>
        <p>
          Download the official developer brochure, floor plans and verified masterplan specifications for {target.title}.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
        <button
          type="button"
          className="button download-action-btn"
          onClick={() => setModalOpen(true)}
        >
          <span>Download Brochure</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      <BrochureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        projectTitle={target.title}
        brochureUrl={target.brochure}
      />
    </div>
  );
}
