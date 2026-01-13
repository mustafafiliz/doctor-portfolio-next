'use client';

interface SpecialtyContentProps {
  content: string;
}

export function SpecialtyContent({ content }: SpecialtyContentProps) {
  return (
    <>
      <div className="prose prose-lg max-w-none mb-12 specialty-content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Specialty Content Styles - Match Editor Styles */}
      <style jsx global>{`
        .specialty-content h2 {
          font-size: 1.5em;
          font-weight: 600;
          margin-bottom: 0.5em;
          margin-top: 1em;
        }
        
        .specialty-content h3 {
          font-size: 1.25em;
          font-weight: 600;
          margin-bottom: 0.5em;
          margin-top: 1em;
        }
        
        .specialty-content p {
          margin-bottom: 0.5em;
          line-height: 1.6;
        }
        
        .specialty-content ul,
        .specialty-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .specialty-content ul {
          list-style-type: disc;
        }
        
        .specialty-content ol {
          list-style-type: decimal;
        }
        
        .specialty-content blockquote {
          border-left: 3px solid #144793;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          color: #666;
          margin-bottom: 1em;
        }
        
        .specialty-content hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 1.5em 0;
        }
        
        .specialty-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
        }
        
        .specialty-content img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
        }
        
        .specialty-content a {
          color: #144793;
          text-decoration: underline;
        }
        
        .specialty-content a:hover {
          color: #0f3a7a;
        }
        
        .specialty-content em {
          font-style: italic;
        }
        
        .specialty-content strong {
          font-weight: 600;
        }
      `}</style>
    </>
  );
}





