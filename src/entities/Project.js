export const Project = {
  async list() {
    return [
      {
        id: '1',
        title: 'SonusShare',
        description: 'Playlist conversion tool enabling seamless music sharing across platforms. Convert playlists between Spotify, Apple Music, YouTube Music, and more.',
        detailed_description: 'A full-stack web application that bridges the gap between music streaming platforms, allowing users to seamlessly convert their playlists across different services. Built with modern web technologies and API integrations.',
        status: 'live',
        tags: ['Music Tech', 'Web App', 'API Integration', 'Product'],
        live_url: 'https://sonusshare.com',
        github_url: null,
        image_url: null,
        featured: true,
        created_date: '2024-12-01'
      },
      {
        id: '2',
        title: 'Where is the Green?',
        description: 'Interactive emissions dashboard for sustainability tracking and environmental impact analysis.',
        detailed_description: 'A comprehensive sustainability tracking platform that helps organizations monitor their environmental impact through data visualization and analytics.',
        status: 'planned',
        tags: ['Sustainability', 'Data Viz', 'Analytics', 'Dashboard'],
        live_url: null,
        github_url: null,
        image_url: null,
        featured: false,
        created_date: '2024-11-15'
      }
    ];
  }
};
