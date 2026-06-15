/**
 * Sovereign Korean Learning Audio Guide — 48 tracks across 19 categories
 * Audio folder: Sovereign_Korean_Learning_Guide/
 */

const SOVEREIGN_BASE = 'Sovereign_Korean_Learning_Guide';

const SOVEREIGN_COURSE_DEFS = [
    {
        folder: `${SOVEREIGN_BASE}/01_Essential_Foundations`,
        subtitle: 'Essential Foundations',
        group: 'sovereign',
        tracks: [
            'Introduction_Welcome.mp3',
            'Sovereign_Learning_Philosophy.mp3',
            'Style_Overview_Grammar_Casual_Slang_Formal.mp3',
            'Pronunciation_Basics.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/02_Melbourne_Arrival_System`,
        subtitle: 'Melbourne Arrival',
        group: 'melbourne',
        tracks: [
            'Airport_Arrival_Complete.mp3',
            'Hotel_Checkin_Complete.mp3',
            'Emergency_Essentials_Complete.mp3',
            'Getting_Help_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/03_Daily_Life_Scenarios`,
        subtitle: 'Daily Life',
        group: 'melbourne',
        tracks: [
            'Coffee_Shop_All_Styles.mp3',
            'Restaurant_Dining_Complete.mp3',
            'Shopping_Basic_Complete.mp3',
            'Transportation_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/04_Self_Intimacy_Practice`,
        subtitle: 'Self-Intimacy Practice',
        group: 'sovereign',
        tracks: [
            'Morning_Affirmations.mp3',
            'Emotional_Processing.mp3',
            'Evening_Reflection.mp3',
            'Self_Compassion_Practice.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/05_Style_Switching_Drills`,
        subtitle: 'Style Switching',
        group: 'sovereign',
        tracks: [
            'Basic_Phrase_Four_Styles.mp3',
            'Speed_Switching_Practice.mp3',
            'Context_Selection_Practice.mp3',
            'Advanced_Style_Mixing.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/06_Emergency_Protocol`,
        subtitle: 'Emergency Protocol',
        group: 'melbourne',
        tracks: [
            'Lost_Confused_Complete.mp3',
            'Medical_Help_Complete.mp3',
            'Police_Emergency_Complete.mp3',
            'Essential_Emergency_Phases.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/07_GoPro_Content_Creation`,
        subtitle: 'GoPro & Content',
        group: 'melbourne',
        tracks: [
            'Self_Dating_Korean_Comedy.mp3',
            '24_Hour_Challenge_Guide.mp3',
            'Self_Talk_Walking_Melbourne.mp3',
            'Content_Creation_Tips.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/08_Transportation_Systems`,
        subtitle: 'Transportation',
        group: 'melbourne',
        tracks: [
            'Train_Travel_Complete.mp3',
            'Bus_Navigation_Complete.mp3',
            'Taxi_Ride_Hailing_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/09_Shopping_Markets`,
        subtitle: 'Shopping & Markets',
        group: 'melbourne',
        tracks: [
            'Basic_Shopping_Complete.mp3',
            'Market_Exploration_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/10_Social_Cultural_Interaction`,
        subtitle: 'Social & Cultural',
        group: 'melbourne',
        tracks: [
            'Meeting_People_Complete.mp3',
            'Cultural_Respect_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/11_Accommodation_Services`,
        subtitle: 'Accommodation',
        group: 'melbourne',
        tracks: [
            'Hotel_Services_Complete.mp3',
            'Service_Requests_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/12_Weather_Environment`,
        subtitle: 'Weather & Environment',
        group: 'melbourne',
        tracks: [
            'Weather_Discussion_Complete.mp3',
            'Environment_Adaptation_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/13_Health_Wellness`,
        subtitle: 'Health & Wellness',
        group: 'melbourne',
        tracks: [
            'Basic_Health_Complete.mp3',
            'Wellness_Practices_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/14_Tech_Connectivity`,
        subtitle: 'Tech & Connectivity',
        group: 'melbourne',
        tracks: [
            'Internet_Connectivity_Complete.mp3',
            'Digital_Services_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/15_Theme_Parks_Attractions`,
        subtitle: 'Theme Parks & Attractions',
        group: 'melbourne',
        tracks: ['Cultural_Sites_Complete.mp3']
    },
    {
        folder: `${SOVEREIGN_BASE}/16_Cultural_Sites_Museums`,
        subtitle: 'Cultural Sites',
        group: 'melbourne',
        tracks: [
            'Museum_Experience_Complete.mp3',
            'Historical_Landmarks_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/17_Local_Customs_Etiquette`,
        subtitle: 'Customs & Etiquette',
        group: 'melbourne',
        tracks: [
            'Dining_Etiquette_Complete.mp3',
            'Social_Etiquette_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/18_Entertainment_Events`,
        subtitle: 'Entertainment & Events',
        group: 'melbourne',
        tracks: [
            'Concerts_Events_Complete.mp3',
            'Festivals_Celebrations_Complete.mp3'
        ]
    },
    {
        folder: `${SOVEREIGN_BASE}/19_Cultural_Appreciation`,
        subtitle: 'Cultural Appreciation',
        group: 'melbourne',
        tracks: [
            'Deep_Appreciation_Complete.mp3',
            'Meaningful_Connection_Complete.mp3'
        ]
    }
];

const JOURNEY_CATEGORIES = [
    { id: 'melbourne', label: 'Melbourne Journey', description: 'Arrival, daily life, transport, and trip scenarios' },
    { id: 'sovereign', label: 'Sovereign Foundations', description: 'Philosophy, style-switching, and self-intimacy' },
    { id: 'all-sovereign', label: 'Full Sovereign Guide', description: 'All 48 sovereign audio tracks' }
];