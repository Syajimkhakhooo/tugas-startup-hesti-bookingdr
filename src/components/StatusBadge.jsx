import React from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  if (status === 'Menunggu' || status === 'Menunggu Konfirmasi') {
    return (
      <span className="badge badge-waiting">
        <Clock size={13} />
        Menunggu Konfirmasi
      </span>
    );
  }
  if (status === 'Selesai') {
    return (
      <span className="badge badge-success">
        <CheckCircle2 size={13} />
        Selesai
      </span>
    );
  }
  return (
    <span className="badge badge-cancel">
      <XCircle size={13} />
      {status}
    </span>
  );
}
