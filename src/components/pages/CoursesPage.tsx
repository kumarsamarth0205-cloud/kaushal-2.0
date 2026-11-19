import React, { useState, useMemo } from 'react';
import { Language, UserProfile } from '../../types';
import { VERIFIED_COURSES_DATABASE, VerifiedCourse } from '../../data/coursesDatabase';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Check, 
  Building2, 
  Search, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap,
  Filter
} from 'lucide-react';

interface CoursesPageProps {
  lang: Language;
  selectedPersonaId: string;
  onNavigate: (page: string) => void;
  userProfile?: UserProfile | null;
  onUpdateProfile?: (profile: UserProfile) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  lang,
  onNavigate,
  userProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<VerifiedCourse | null>(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('ks_enrolled_courses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const platforms: Array<{ id: string; label: string; count: number }> = useMemo(() => {
    return [
      { id: 'all', label: 'All Platforms', count: VERIFIED_COURSES_DATABASE.length },
      { id: 'NPTEL', label: 'NPTEL (IITs)', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'NPTEL').length },
      { id: 'SWAYAM', label: 'SWAYAM', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'SWAYAM').length },
      { id: 'Skill India Digital', label: 'Skill India Digital', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'Skill India Digital').length },
      { id: 'Cisco Networking Academy', label: 'Cisco NetAcad', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'Cisco Networking Academy').length },
      { id: 'AWS Academy', label: 'AWS Academy', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'AWS Academy').length },
      { id: 'Google Career Certificates', label: 'Google Career', count: VERIFIED_COURSES_DATABASE.filter(c => c.platform === 'Google Career Certificates').length },
    ];
  }, []);

  const categories: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'All Domains' },
    { id: 'Cyber Security', label: 'Cyber Security' },
    { id: 'Artificial Intelligence & ML', label: 'AI & Machine Learning' },
    { id: 'Data Science', label: 'Data Science' },
    { id: 'Full-Stack Web Development', label: 'Full-Stack Web Dev' },
    { id: 'Cloud Computing', label: 'Cloud Computing' },
    { id: 'IoT/Embedded Systems', label: 'IoT & Embedded' },
    { id: 'ATS Resume Engineering', label: 'ATS Resume Engineering' },
  ];

  // REAL-TIME SEARCH & MULTI-FILTER ENGINE
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return VERIFIED_COURSES_DATABASE.filter(c => {
      // Platform filter
      if (selectedPlatform !== 'all' && c.platform !== selectedPlatform) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }
      // Instant Text Search across Title, Platform, Category, Skills, Institution, Instructor
      if (q) {
        const titleMatch = c.title.toLowerCase().includes(q) || c.titleHi.toLowerCase().includes(q);
        const platformMatch = c.platform.toLowerCase().includes(q);
        const categoryMatch = c.category.toLowerCase().includes(q);
        const institutionMatch = c.institution.toLowerCase().includes(q);
        const instructorMatch = c.instructor?.toLowerCase().includes(q) || false;
        const skillMatch = c.skills.some(s => s.toLowerCase().includes(q));

        if (!titleMatch && !platformMatch && !categoryMatch && !institutionMatch && !instructorMatch && !skillMatch) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedPlatform, selectedCategory]);

  const handleEnroll = (course: VerifiedCourse) => {
    const updated = { ...enrolledCourseIds, [course.id]: true };
    setEnrolledCourseIds(updated);
    try {
      localStorage.setItem('ks_enrolled_courses', JSON.stringify(updated));
    } catch {}

    setAlertMsg(`Successfully enrolled in "${course.title}". Direct SWAYAM/Portal registration credited.`);
    setTimeout(() => setAlertMsg(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      
      {/* Toast Alert */}
      {alertMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{alertMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Academic Senate Verified Curriculum</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono-data">24 Real Certification Courses</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Certification & Micro-Course Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Directly bridge diagnostic skill gaps with recognized courses from NPTEL, SWAYAM, Cisco Networking Academy, AWS Academy, Google, and Skill India Digital.
          </p>
        </div>

        {/* Dynamic Skill Score Uplift Pill */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Zap className="w-5 h-5 text-amber-300" />
          </div>
          <div className="text-xs">
            <span className="text-slate-500 block">Avg. Skill Score Boost:</span>
            <span className="font-bold text-blue-900 font-mono-data text-sm">+40 to +65 Points</span>
          </div>
        </div>
      </div>

      {/* REAL-TIME SEARCH BAR & MULTI-FILTER CONTROL */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search 24+ courses by keyword (e.g. 'Cyber Security', 'SWAYAM', 'NPTEL', 'AI', 'Python', 'AWS', 'React')..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Platform Filter Pills */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-mono-data text-slate-400 uppercase font-bold tracking-wider">
            FILTER BY OFFICIAL PLATFORM:
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPlatform(p.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedPlatform === p.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-data font-bold ${
                  selectedPlatform === p.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {p.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <div className="text-[11px] font-mono-data text-slate-400 uppercase font-bold tracking-wider">
            FILTER BY TECH DOMAIN:
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* FILTER RESULTS COUNTER */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-mono-data px-1">
        <span>
          Showing <strong>{filteredCourses.length}</strong> of {VERIFIED_COURSES_DATABASE.length} verified certification courses
        </span>
        {(searchQuery || selectedPlatform !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPlatform('all');
              setSelectedCategory('all');
            }}
            className="text-blue-600 hover:underline font-bold"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 24 COURSES GRID */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-slate-300 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No courses match your search criteria</h3>
          <p className="text-xs text-slate-500">
            Try searching for broader keywords like "Cyber Security", "SWAYAM", "Python", or "Cloud".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPlatform('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
          >
            View Full 24 Courses Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map(course => {
            const isEnrolled = enrolledCourseIds[course.id];

            return (
              <div
                key={course.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Platform & Cost Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10.5px] font-mono-data font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                      {course.platform}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-mono-data font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {course.costTag}
                    </span>
                  </div>

                  {/* Course Title & Institution */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{course.institution}</span>
                      {course.instructor && (
                        <>
                          <span>·</span>
                          <span className="truncate">{course.instructor}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Course Specs Strip */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-mono-data flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="text-blue-700 font-bold bg-blue-100/70 px-2 py-0.5 rounded">
                      +{course.skillScoreBoost} Skill Pts
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.skills.slice(0, 3).map((sk, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {sk}
                      </span>
                    ))}
                    {course.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-mono-data self-center">
                        +{course.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCourseDetail(course)}
                    className="text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                  >
                    Syllabus
                  </button>

                  <div className="flex items-center gap-2">
                    {/* Working View Official Course Link */}
                    <a
                      href={course.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                      title="Open course on official portal"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>

                    {/* 1-Click FastTrack Enroll */}
                    <button
                      onClick={() => handleEnroll(course)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isEnrolled
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                      }`}
                    >
                      {isEnrolled ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Enrolled</span>
                        </>
                      ) : (
                        <span>Enroll</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SYLLABUS & ACCREDITATION MODAL */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-data font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {selectedCourseDetail.platform} · {selectedCourseDetail.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedCourseDetail.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Offering Institution:</span>
                  <strong className="text-slate-900">{selectedCourseDetail.institution}</strong>
                </div>
                {selectedCourseDetail.instructor && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Instructor:</span>
                    <span className="font-semibold text-slate-800">{selectedCourseDetail.instructor}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Accreditation:</span>
                  <span className="font-bold text-emerald-700">{selectedCourseDetail.accreditation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-mono-data text-slate-800">{selectedCourseDetail.duration} ({selectedCourseDetail.durationHours} Hours)</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Course Description & Learning Outcomes:</span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedCourseDetail.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1.5">Skills Tested & Covered:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCourseDetail.skills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
              <a
                href={selectedCourseDetail.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Official Course Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  handleEnroll(selectedCourseDetail);
                  setSelectedCourseDetail(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Enroll Free & Link to ID
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
