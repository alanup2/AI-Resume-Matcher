'use client';

import { useState, useRef, DragEvent } from 'react';
import { motion } from 'framer-motion';
import { Upload, File } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  file: File | null;
  loading: boolean;
}

export default function UploadZone({ onFileSelect, onAnalyze, file, loading }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.click();
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.click();
  };

  const handleAnalyzeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAnalyze();
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragging(true);
    else if (e.type === 'dragleave') setDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f?.type === 'application/pdf') onFileSelect(f);
  };

  return (
    <div className="relative max-w-[720px] mx-auto">
      <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
      <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-primary/40 pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-primary/40 pointer-events-none" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-primary/40 pointer-events-none" />

      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleContainerClick}
        animate={{
          borderColor: dragging ? 'rgba(255,122,0,0.6)' : 'rgba(88,66,53,0.3)',
          scale: dragging ? 1.01 : 1,
        }}
        className="glass rounded-2xl p-12 text-center cursor-pointer border-2 border-dashed transition-colors"
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files?.[0] && onFileSelect(e.target.files[0])}
          className="hidden"
        />

        <motion.div
          animate={{ scale: dragging ? 1.1 : 1 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          {file ? (
            <File className="text-primary" size={40} />
          ) : (
            <Upload className="text-primary" size={40} />
          )}
        </motion.div>

        <h2 className="font-display text-xl font-semibold text-white mb-2">
          {file ? file.name : 'Drop your resume here to begin analysis'}
        </h2>
        <p className="text-text-secondary mb-8">Support for PDF format</p>

        <div className="flex gap-4 justify-center flex-wrap" onClick={(e) => e.stopPropagation()}>
          <AnimatedButton
            variant="primary"
            onClick={handleBrowseClick}
          >
            Browse Files
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            onClick={handleAnalyzeClick}
            disabled={!file || loading}
            loading={loading}
          >
            Analyze Resume
          </AnimatedButton>
        </div>

        {file && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-mono text-xs text-primary"
          >
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
