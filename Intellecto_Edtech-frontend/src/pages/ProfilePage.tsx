import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { auth } from '@/components/auth/firebase';

interface Resume {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    url: string;
}

interface Skill {
    id: string;
    name: string;
    level: number;
}

interface Experience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
}

interface Education {
    id: string;
    institution: string;
    degree: string;
    duration: string;
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'resume'>('profile');
    const [resume, setResume] = useState<Resume | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const profileImageInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    interface BackendUser {
        id: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        role?: string;
        profile_picture?: string | null;
        bio?: string | null;
        interests?: string | null;
        skill_level?: string | null;
        created_at?: string;
        is_verified?: boolean;
    }

    // Original data states - these will hold the confirmed/saved data
    interface OriginalProfileData {
        name: string;
        title: string;
        email: string;
        phone?: string;
        location?: string;
        bio?: string;
        interests?: string;
        skill_level?: string;
    }

    const [originalProfileData, setOriginalProfileData] = useState<OriginalProfileData>({
        name: 'Learner Name',
        title: 'Student',
        email: 'learner@example.com',
        phone: '',
        location: '',
        bio: 'This learner is exploring courses and interview practice on Intellecto.',
        interests: 'Web Development, Algorithms',
        skill_level: 'beginner'
    });
    const [backendUserId, setBackendUserId] = useState<string | null>(null);
    interface UserUpdatePayload {
        username?: string;
        email?: string;
        first_name?: string;
        last_name?: string;
        profile_picture?: string | null;
        bio?: string | null;
        interests?: string | null;
        skill_level?: string | null;
    }
    const [originalSkills, setOriginalSkills] = useState<Skill[]>([
        { id: '1', name: 'React', level: 90 },
        { id: '2', name: 'TypeScript', level: 85 },
        { id: '3', name: 'UI/UX Design', level: 80 },
        { id: '4', name: 'Node.js', level: 75 },
    ]);
    const [originalExperiences, setOriginalExperiences] = useState<Experience[]>([
        {
            id: '1',
            company: 'Tech Innovations Inc.',
            position: 'Senior Frontend Developer',
            duration: '2020 - Present',
            description: 'Lead the frontend team in developing responsive web applications using React and TypeScript.'
        },
        {
            id: '2',
            company: 'Digital Solutions Ltd.',
            position: 'Frontend Developer',
            duration: '2017 - 2020',
            description: 'Developed and maintained client-facing applications with a focus on user experience.'
        }
    ]);
    const [originalEducations, setOriginalEducations] = useState<Education[]>([
        {
            id: '1',
            institution: 'University of Technology',
            degree: 'Master of Computer Science',
            duration: '2015 - 2017'
        },
        {
            id: '2',
            institution: 'State University',
            degree: 'Bachelor of Software Engineering',
            duration: '2011 - 2015'
        }
    ]);

    // Editable data states - these hold temporary changes during editing
    const [editableProfileData, setEditableProfileData] = useState(originalProfileData);
    const [editableSkills, setEditableSkills] = useState(originalSkills);
    const [editableExperiences, setEditableExperiences] = useState(originalExperiences);
    const [editableEducations, setEditableEducations] = useState(originalEducations);

    // Animation variants (unchanged)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 }
        }
    };

    // File upload handlers (unchanged)
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setResume({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    url: event.target?.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const triggerProfileImageInput = () => {
        profileImageInputRef.current?.click();
    };

    // Toggle edit mode with proper state management
    const toggleEditMode = () => {
        if (!editMode) {
            // Entering edit mode - create copies of all original data
            setEditableProfileData({ ...originalProfileData });
            setEditableSkills([...originalSkills]);
            setEditableExperiences([...originalExperiences]);
            setEditableEducations([...originalEducations]);
        }
        setEditMode(!editMode);
    };

    // Handle input changes for editable profile data
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditableProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Skill handlers (working with editableSkills)
    const addNewSkill = () => {
        setEditableSkills([...editableSkills, { id: Date.now().toString(), name: '', level: 50 }]);
    };

    const removeSkill = (id: string) => {
        setEditableSkills(editableSkills.filter(skill => skill.id !== id));
    };

    const updateSkill = (id: string, field: string, value: string | number) => {
        setEditableSkills(editableSkills.map(skill =>
            skill.id === id ? { ...skill, [field]: value } : skill
        ));
    };

    // Experience handlers (working with editableExperiences)
    const addNewExperience = () => {
        setEditableExperiences([...editableExperiences, {
            id: Date.now().toString(),
            company: '',
            position: '',
            duration: '',
            description: ''
        }]);
    };

    const removeExperience = (id: string) => {
        setEditableExperiences(editableExperiences.filter(exp => exp.id !== id));
    };

    const updateExperience = (id: string, field: string, value: string) => {
        setEditableExperiences(editableExperiences.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    // Education handlers (working with editableEducations)
    const addNewEducation = () => {
        setEditableEducations([...editableEducations, {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            duration: ''
        }]);
    };

    const removeEducation = (id: string) => {
        setEditableEducations(editableEducations.filter(edu => edu.id !== id));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setEditableEducations(editableEducations.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    // Save handler - updates original data and persist to backend (best-effort)
    const handleSaveProfile = async () => {
        try {
            // Update local state first
            setOriginalProfileData(editableProfileData);
            setOriginalSkills(editableSkills);
            setOriginalExperiences(editableExperiences);
            setOriginalEducations(editableEducations);

            // Best-effort: send updated profile to backend if we know the backend user id
            if (backendUserId) {
                try {
                    const payload: UserUpdatePayload = {
                        username: JSON.parse(localStorage.getItem('it_user_meta') || 'null')?.user_name,
                        email: editableProfileData.email,
                        first_name: (editableProfileData.name || '').split(' ')[0] || undefined,
                        last_name: (editableProfileData.name || '').split(' ').slice(1).join(' ') || undefined,
                        profile_picture: profileImage || undefined,
                        bio: editableProfileData.bio,
                        interests: editableProfileData.interests,
                        skill_level: editableProfileData.skill_level,
                    };
                    await api.put(`/users/${backendUserId}`, payload);
                } catch (err) {
                    console.warn('Could not save profile to backend:', err);
                }
            }

            setEditMode(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            // You might want to show an error message to the user here
        }
    };

    // Load profile from backend (best-effort) and merge into originalProfileData
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const stored = localStorage.getItem('it_user_meta');
                const fallbackEmail = stored ? JSON.parse(stored).email : null;
                const email = auth.currentUser?.email || fallbackEmail;
                if (!email) return;
                const res = await api.get(`/users/by-email?email=${encodeURIComponent(email)}`) as BackendUser;
                // Map backend fields to local profile structure
                const backendProfile = {
                    name: `${res.first_name || ''} ${res.last_name || ''}`.trim() || originalProfileData.name,
                    title: res.role ? `${res.role.charAt(0).toUpperCase() + res.role.slice(1)}` : originalProfileData.title,
                    email: res.email || originalProfileData.email,
                    bio: res.bio || originalProfileData.bio,
                    interests: res.interests || originalProfileData.interests,
                    skill_level: res.skill_level || originalProfileData.skill_level,
                };
                setOriginalProfileData(prev => ({ ...prev, ...backendProfile }));
                setEditableProfileData(prev => ({ ...prev, ...backendProfile }));
                setBackendUserId(res.id || null);
                if (res.profile_picture) setProfileImage(res.profile_picture);
            } catch (err) {
                console.warn('Could not load backend profile:', err);
            }
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen dashboard-body">
            <title>{originalProfileData.name} | Professional Profile</title>
            <meta name="description" content="Professional profile page" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container mx-auto px-4 py-8"
            >
                {/* Header */}
                <motion.header variants={itemVariants} className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text">
                        <span><button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-7 h-7" />

                        </button></span><br />
                        Professional Profile
                    </h1>
                    <div className="flex items-center gap-4">
                        {editMode && (
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-end"
                            >
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-6 py-2 rounded-lg gradient-primary hover:opacity-90 transition-opacity text-primary-foreground font-medium"
                                >
                                    Save Changes
                                </button>
                            </motion.div>
                        )}
                        <button
                            onClick={toggleEditMode}
                            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover transition-colors text-primary-foreground"
                        >
                            {editMode ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </motion.header>

                <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <motion.div
                            whileHover="hover"
                            variants={cardVariants}
                            className="glass rounded-xl p-6 shadow-elegant"
                        >
                            <div className="flex flex-col items-center mb-6 relative">
                                <div className="relative mb-4 group">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl font-bold text-primary-foreground">
                                                {originalProfileData.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={triggerProfileImageInput}
                                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary-hover transition-colors flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </button>
                                    <input
                                        type="file"
                                        ref={profileImageInputRef}
                                        onChange={handleProfileImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                                {editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editableProfileData.name}
                                            onChange={handleInputChange}
                                            className="text-xl font-bold text-center bg-input text-foreground rounded px-2 py-1 mb-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            name="title"
                                            value={editableProfileData.title}
                                            onChange={handleInputChange}
                                            className="text-muted-foreground text-center bg-input rounded px-2 py-1 w-full"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-bold text-center">{originalProfileData.name}</h2>
                                        <p className="text-muted-foreground text-center">{originalProfileData.title}</p>
                                    </>
                                )}
                            </div>

                            <div className="space-y-4">
                                <motion.div variants={itemVariants}>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-2 text-center">CONTACT</h3>
                                    <ul className="space-y-2">
                                        <motion.li variants={itemVariants} className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                            {editMode ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editableProfileData.email}
                                                    onChange={handleInputChange}
                                                    className="bg-input text-foreground rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span>{originalProfileData.email}</span>
                                            )}
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            {editMode ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={editableProfileData.phone}
                                                    onChange={handleInputChange}
                                                    className="bg-input text-foreground rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span>{originalProfileData.phone}</span>
                                            )}
                                        </motion.li>
                                        <motion.li variants={itemVariants} className="flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={editableProfileData.location}
                                                    onChange={handleInputChange}
                                                    className="bg-input text-foreground rounded px-2 py-1 w-full"
                                                />
                                            ) : (
                                                <span>{originalProfileData.location}</span>
                                            )}
                                        </motion.li>
                                    </ul>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-muted-foreground mb-2">SKILLS</h3>
                                        {editMode && (
                                            <button
                                                onClick={addNewSkill}
                                                className="text-primary text-sm hover:text-primary-hover"
                                            >
                                                + Add
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {(editMode ? editableSkills : originalSkills).map((skill) => (
                                                <motion.div
                                                    key={skill.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {editMode ? (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    value={skill.name}
                                                                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                                                    className="bg-input text-foreground rounded px-2 py-1 flex-1"
                                                                    placeholder="Skill name"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    value={skill.level}
                                                                    onChange={(e) => updateSkill(skill.id, 'level', parseInt(e.target.value))}
                                                                    className="bg-input text-foreground rounded px-2 py-1 w-16"
                                                                />
                                                                <button
                                                                    onClick={() => removeSkill(skill.id)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    ×
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-sm flex-1">{skill.name}</span>
                                                                <span className="text-sm">{skill.level}%</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="w-full bg-secondary h-1 rounded-full overflow-hidden mt-1">
                                                        <div
                                                            className="h-full gradient-primary rounded-full"
                                                            style={{ width: `${skill.level}%` }}
                                                        ></div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
                        {/* Tabs */}
                        <motion.div
                            variants={itemVariants}
                            className="glass rounded-xl overflow-hidden max-w-md mx-auto"
                        >
                            <div className="flex border-b border-border">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex-1 py-3 font-medium ${activeTab === 'profile' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('resume')}
                                    className={`flex-1 py-3 font-medium ${activeTab === 'resume' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
                                >
                                    Resume
                                </button>
                            </div>
                        </motion.div>

                        {/* Tab Content */}
                        {activeTab === 'profile' ? (
                            <motion.div variants={containerVariants} className="space-y-8">
                                {/* About */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover="hover"
                                    className="glass rounded-xl p-6 shadow-elegant"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">About</h2>
                                    </div>
                                    {editMode ? (
                                        <textarea
                                            name="bio"
                                            value={editableProfileData.bio}
                                            onChange={handleInputChange}
                                            className="w-full bg-input text-foreground rounded-lg px-4 py-3 min-h-[120px]"
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <p className="text-muted-foreground">{originalProfileData.bio}</p>
                                    )}
                                </motion.div>

                                {/* Experience */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover="hover"
                                    className="glass rounded-xl p-6 shadow-elegant"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Experience</h2>
                                        {editMode && (
                                            <button
                                                onClick={addNewExperience}
                                                className="text-primary hover:text-primary-hover"
                                            >
                                                + Add Experience
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        <AnimatePresence>
                                            {(editMode ? editableExperiences : originalExperiences).map(exp => (
                                                <motion.div
                                                    key={exp.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="border-l-2 border-primary pl-4 py-1"
                                                >
                                                    {editMode ? (
                                                        <div className="space-y-2">
                                                            <div className="flex gap-2 items-center">
                                                                <input
                                                                    type="text"
                                                                    value={exp.position}
                                                                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                                                    className="bg-input text-foreground rounded px-2 py-1 flex-1"
                                                                    placeholder="Position"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={exp.duration}
                                                                    onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                                                                    className="bg-input text-foreground rounded px-2 py-1 w-32"
                                                                    placeholder="Duration"
                                                                />
                                                                <button
                                                                    onClick={() => removeExperience(exp.id)}
                                                                    className="text-red-500 hover:text-red-700 px-2"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={exp.company}
                                                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                                className="bg-input text-foreground rounded px-2 py-1 w-full"
                                                                placeholder="Company"
                                                            />
                                                            <textarea
                                                                value={exp.description}
                                                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                                className="w-full bg-input text-foreground rounded-lg px-2 py-1 min-h-[60px]"
                                                                placeholder="Description"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-between">
                                                                <h3 className="font-bold">{exp.position}</h3>
                                                                <span className="text-sm text-muted-foreground">{exp.duration}</span>
                                                            </div>
                                                            <p className="text-primary text-sm mb-2">{exp.company}</p>
                                                            <p className="text-muted-foreground">{exp.description}</p>
                                                        </>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>

                                {/* Education */}
                                <motion.div
                                    variants={itemVariants}
                                    whileHover="hover"
                                    className="glass rounded-xl p-6 shadow-elegant"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Education</h2>
                                        {editMode && (
                                            <button
                                                onClick={addNewEducation}
                                                className="text-primary hover:text-primary-hover"
                                            >
                                                + Add Education
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <AnimatePresence>
                                            {(editMode ? editableEducations : originalEducations).map(edu => (
                                                <motion.div
                                                    key={edu.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="border-l-2 border-primary pl-4 py-1"
                                                >
                                                    {editMode ? (
                                                        <div className="space-y-2">
                                                            <div className="flex gap-2 items-center">
                                                                <input
                                                                    type="text"
                                                                    value={edu.degree}
                                                                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                                    className="bg-input text-foreground rounded px-2 py-1 flex-1"
                                                                    placeholder="Degree"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={edu.duration}
                                                                    onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                                                                    className="bg-input text-foreground rounded px-2 py-1 w-32"
                                                                    placeholder="Duration"
                                                                />
                                                                <button
                                                                    onClick={() => removeEducation(edu.id)}
                                                                    className="text-red-500 hover:text-red-700 px-2"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={edu.institution}
                                                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                                                className="bg-input text-foreground rounded px-2 py-1 w-full"
                                                                placeholder="Institution"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex justify-between">
                                                                <h3 className="font-bold">{edu.degree}</h3>
                                                                <span className="text-sm text-muted-foreground">{edu.duration}</span>
                                                            </div>
                                                            <p className="text-primary text-sm">{edu.institution}</p>
                                                        </>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className="container mx-auto px-4 py-8"
                            >
                                <div className="flex flex-col items-center justify-center py-12">
                                    {resume ? (
                                        <motion.div
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            className="text-center"
                                        >
                                            <div className="mb-6 p-4 border border-border rounded-lg inline-block">
                                                <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">{resume.name}</h3>
                                            <p className="text-muted-foreground mb-6">{(resume.size / 1024).toFixed(1)} KB</p>
                                            <div className="flex gap-4 justify-center">
                                                <a
                                                    href={resume.url}
                                                    download={resume.name}
                                                    className="px-4 py-2 rounded-lg gradient-primary hover:opacity-90 transition-opacity text-primary-foreground"
                                                >
                                                    Download
                                                </a>
                                                <button
                                                    onClick={triggerFileInput}
                                                    className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                                                >
                                                    Replace
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center max-w-md"
                                        >
                                            <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Upload Your Resume</h3>
                                            <p className="text-muted-foreground mb-6">Upload a PDF, DOC or DOCX file. Max file size 5MB.</p>
                                            <button
                                                onClick={triggerFileInput}
                                                className="px-6 py-3 rounded-lg gradient-primary hover:opacity-90 transition-opacity text-primary-foreground font-medium"
                                            >
                                                Select File
                                            </button>
                                        </motion.div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}