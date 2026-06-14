import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | K-TECH DYNAMIC LTD`;
    
    // Manage description tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      description || 'K-TECH DYNAMIC LTD provides premium marine logistics, offshore support, vessel management, marine fuel supply, and maritime engineering in Nigeria.'
    );

    // Manage keywords tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      keywords || 'marine logistics, offshore services, vessel management, tugboat services, barge rental Nigeria, AGO fuel supply, ship repairs'
    );
  }, [title, description, keywords]);

  return null;
}
