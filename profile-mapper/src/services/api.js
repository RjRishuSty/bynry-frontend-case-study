const mockProfiles = [
    {
        id: 1,
        name: 'Ravi Kumar',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg',
        description: 'Frontend Developer from Delhi.',
        location: { lat: 28.6139, lng: 77.2090 },
        contact: 'ravi.kumar@example.com',
        interests: 'Coding, Reading'
    },
    {
        id: 2,
        name: 'Anita Sharma',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        description: 'Designer based in Mumbai.',
        location: { lat: 19.0760, lng: 72.8777 },
        contact: 'anita.sharma@example.com',
        interests: 'Design, Photography'
    },
     {
        id: 3,
        name: 'Ravi Kumar',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg',
        description: 'Frontend Developer from Delhi.',
        location: { lat: 28.6139, lng: 77.2090 },
        contact: 'ravi.kumar@example.com',
        interests: 'Coding, Reading'
    },
    {
        id: 4,
        name: 'Anita Sharma',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
        description: 'Designer based in Mumbai.',
        location: { lat: 19.0760, lng: 72.8777 },
        contact: 'anita.sharma@example.com',
        interests: 'Design, Photography'
    }
];

export const getProfiles = () => Promise.resolve(mockProfiles);
export const deleteProfile = (id) => Promise.resolve(mockProfiles.filter(p => p.id !== id));
export const updateProfile = (id, updated) => Promise.resolve(updated);
export const addProfile = (profile) => Promise.resolve({ ...profile, id: Date.now() });

