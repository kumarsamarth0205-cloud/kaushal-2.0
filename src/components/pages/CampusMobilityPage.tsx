import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { CampusGateCongestion, CampusTransitRoute } from '../../types';
import { 
  Navigation, 
  Bus, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Activity, 
  Car, 
  TrendingDown, 
  Compass, 
  Radio, 
  Users, 
  Zap,
  Building,
  ArrowRight,
  Filter
} from 'lucide-react';

interface CampusMobilityPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

export const CampusMobilityPage: React.FC<CampusMobilityPageProps> = ({ lang, onNavigate }) => {
  const [selectedGate, setSelectedGate] = useState<string>('gate-1');
  const [vehicleMode, setVehicleMode] = useState<'bus' | 'two-wheeler' | 'four-wheeler'>('bus');
  const [commuteOrigin, setCommuteOrigin] = useState<string>('hazratganj');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [telemetryTime, setTelemetryTime] = useState<string>('Just now');
  const [reportedIncident, setReportedIncident] = useState<string | null>(null);

  // Gates State
  const [gates, setGates] = useState<CampusGateCongestion[]>([
    {
      id: 'gate-1',
      gateName: 'Gate 1 — Main Academic & Admin Portal',
      gateNameHi: 'गेट १ — मुख्य शैक्षणिक एवं प्रशासनिक द्वार',
      location: 'National Highway Corridor (Front Entrance)',
      status: 'Normal',
      statusHi: 'सामान्य',
      avgWaitMins: 3,
      vehiclesPerHour: 380,
      lastUpdated: '12 sec ago',
      recommendedEntry: true,
    },
    {
      id: 'gate-2',
      gateName: 'Gate 2 — North Hostel & Sports Complex',
      gateNameHi: 'गेट २ — उत्तरी छात्रावास व खेल परिसर',
      location: 'Ring Road Bypass / Faculty Residence',
      status: 'Moderate',
      statusHi: 'मध्यम',
      avgWaitMins: 9,
      vehiclesPerHour: 510,
      lastUpdated: '30 sec ago',
      recommendedEntry: false,
    },
    {
      id: 'gate-3',
      gateName: 'Gate 3 — East Tech Park & Bus Bay',
      gateNameHi: 'गेट ३ — पूर्वी टेक पार्क एवं बस बे',
      location: 'Industrial Estate Service Road',
      status: 'Heavy',
      statusHi: 'भारी',
      avgWaitMins: 17,
      vehiclesPerHour: 720,
      lastUpdated: '45 sec ago',
      recommendedEntry: false,
    },
  ]);

  // College Bus Telemetry
  const [buses, setBuses] = useState<CampusTransitRoute[]>([
    {
      id: 'bus-101',
      busNumber: 'Bus 04 (Hazratganj Express)',
      routeName: 'Hazratganj → Charbagh → Alambagh → Campus',
      routeNameHi: 'हज़रतगंज → चारबाग → आलमबाग → कॉलेज',
      origin: 'Hazratganj Chauraha',
      destination: 'Campus Main Terminal',
      currentLocation: 'Alambagh Metro Flyover',
      etaToCampusMins: 14,
      occupancyPercent: 88,
      delayMins: 2,
      status: 'On Time',
      statusHi: 'समय पर',
    },
    {
      id: 'bus-102',
      busNumber: 'Bus 08 (Gomti Nagar Shuttle)',
      routeName: 'Gomti Nagar → Polytechnic → Faizabad Rd → Campus',
      routeNameHi: 'गोमती नगर → पॉलीटेक्निक → फ़ैज़ाबाद रोड → कॉलेज',
      origin: 'Patrakarpuram',
      destination: 'Gate 1 Academic Bay',
      currentLocation: 'Polytechnic Chauraha Service Lane',
      etaToCampusMins: 22,
      occupancyPercent: 94,
      delayMins: 7,
      status: 'Slight Delay',
      statusHi: 'हल्का विलंब',
    },
    {
      id: 'bus-103',
      busNumber: 'Bus 12 (Indira Nagar Metro Feeder)',
      routeName: 'Munshipulia → Lekhraj → Ring Road → Campus',
      routeNameHi: 'मुंशीपुलिया → लेखराज → रिंग रोड → कॉलेज',
      origin: 'Munshipulia Metro Station',
      destination: 'Hostel Terminal',
      currentLocation: 'Kalyanpur Crossing',
      etaToCampusMins: 9,
      occupancyPercent: 72,
      delayMins: 0,
      status: 'On Time',
      statusHi: 'समय पर',
    },
    {
      id: 'bus-104',
      busNumber: 'Bus 16 (Kanpur Highway Express)',
      routeName: 'Sarojini Nagar → Transport Nagar → VIP Rd → Campus',
      routeNameHi: 'सरोजिनी नगर → ट्रांसपोर्ट नगर → वीआईपी रोड → कॉलेज',
      origin: 'Sarojini Nagar Market',
      destination: 'Gate 3 Bay',
      currentLocation: 'Amausi Airport Intersection',
      etaToCampusMins: 28,
      occupancyPercent: 96,
      delayMins: 12,
      status: 'Heavy Traffic',
      statusHi: 'भारी जाम',
    },
  ]);

  const handleRefreshSensors = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate live jitter
      setGates(prev => prev.map(g => ({
        ...g,
        avgWaitMins: Math.max(1, g.avgWaitMins + Math.floor(Math.random() * 3) - 1),
        vehiclesPerHour: g.vehiclesPerHour + Math.floor(Math.random() * 20) - 10,
        lastUpdated: '1 sec ago'
      })));
      setBuses(prev => prev.map(b => ({
        ...b,
        etaToCampusMins: Math.max(2, b.etaToCampusMins - 1),
      })));
      setTelemetryTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 600);
  };

  const handleReportCongestion = () => {
    setReportedIncident(
      lang === 'en'
        ? 'Traffic report logged: Rerouting alert broadcasted to Campus Security & Bus Fleet.'
        : 'ट्रैफिक जाम की सूचना दर्ज: सुरक्षा दल एवं बस चालकों को वैकल्पिक मार्ग अलर्ट भेजा गया।'
    );
    setTimeout(() => setReportedIncident(null), 4000);
  };

  const activeGateObj = gates.find(g => g.id === selectedGate) || gates[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      
      {/* Toast Alert */}
      {reportedIncident && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-emerald-500 text-slate-900 text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{reportedIncident}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              {lang === 'en' ? 'Live Campus Radar' : 'लाइव कैंपस रडार'}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono-data">{lang === 'en' ? 'Gate Telemetry & Bus GPS' : 'गेट सेंसर व बस जीपीएस'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {lang === 'en' ? 'Campus Transit & Gate Traffic Radar' : 'कैंपस बस व गेट ट्रैफिक रडार'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {lang === 'en'
              ? 'Real-time entry gate congestion, college bus tracking, and smart commute advisories to ensure you reach morning lectures on time.'
              : 'कॉलेज मुख्य द्वारों पर लाइव भीड़ की स्थिति, बसों की जीपीएस ट्रैकिंग एवं समय पर पहुंचने हेतु सटीक मार्ग सुझाव।'}
          </p>
        </div>

        {/* Live Refresh Control */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-[11px] font-mono-data text-slate-500 hidden sm:block">
            Updated: <strong className="text-slate-800">{telemetryTime}</strong>
          </div>
          <button
            onClick={handleRefreshSensors}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-600'}`} />
            <span>{lang === 'en' ? 'Refresh Sensors' : 'सेंसर रीफ्रेश'}</span>
          </button>
        </div>
      </div>

      {/* Institutional Telemetry Quick KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Peak Entry Bottleneck</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-mono-data font-bold text-emerald-600">-35.4%</div>
          <div className="text-[11px] text-slate-500">Smoother flow before 9:00 AM labs</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Daily Commute Saved</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-mono-data font-bold text-blue-700">18.5 Mins</div>
          <div className="text-[11px] text-slate-500">Per day-scholar / faculty trip</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>College Bus Fleet On-Time</span>
            <Bus className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-mono-data font-bold text-slate-900">94.2%</div>
          <div className="text-[11px] text-slate-500">4 Active city transit corridors</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Campus Daily Utility</span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-mono-data font-bold text-purple-700">100% DAU</div>
          <div className="text-[11px] text-slate-500">Recurring daily student engagement</div>
        </div>
      </div>

      {/* Main Section: Gate Telemetry & Interactive Campus Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 cols: Gate Congestion Dashboard */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>{lang === 'en' ? 'Live Campus Gate Congestion Radar' : 'कैंपस प्रवेश द्वार लाइव रडार'}</span>
            </h2>
            <span className="text-[11px] font-mono-data text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ● 3 Gates Online
            </span>
          </div>

          <div className="space-y-3">
            {gates.map(gate => {
              const isSelected = gate.id === selectedGate;
              const isNormal = gate.status === 'Normal';
              const isModerate = gate.status === 'Moderate';
              const isHeavy = gate.status === 'Heavy';

              return (
                <div
                  key={gate.id}
                  onClick={() => setSelectedGate(gate.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-blue-50/40 border-blue-500 shadow-sm ring-1 ring-blue-400/40'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {lang === 'en' ? gate.gateName : gate.gateNameHi}
                        </span>
                        {gate.recommendedEntry && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider font-mono-data">
                            Fastest
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{gate.location}</span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className={`px-2.5 py-1 rounded-full text-xs font-mono-data font-bold flex items-center gap-1.5 ${
                      isNormal
                        ? 'bg-emerald-100 text-emerald-800'
                        : isModerate
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800 animate-pulse'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        isNormal ? 'bg-emerald-600' : isModerate ? 'bg-amber-600' : 'bg-rose-600'
                      }`} />
                      <span>{lang === 'en' ? gate.status : gate.statusHi}</span>
                    </div>
                  </div>

                  {/* Quantitative Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-100/90 font-mono-data">
                    <div className="bg-slate-50 rounded-xl p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Est. Wait</span>
                      <strong className={`text-sm ${isNormal ? 'text-emerald-700' : isModerate ? 'text-amber-700' : 'text-rose-700'}`}>
                        ~{gate.avgWaitMins} Mins
                      </strong>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Throughput</span>
                      <strong className="text-sm text-slate-800">{gate.vehiclesPerHour} / hr</strong>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2.5">
                      <span className="text-slate-400 block text-[10px] uppercase">Sensor Sync</span>
                      <strong className="text-sm text-slate-600">{gate.lastUpdated}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Incident Reporting & Traffic Advisory Action */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>See bottleneck or barricade at your campus gate?</span>
              </span>
              <p className="text-[11px] text-amber-800">
                Submit an instant crowd-sourced alert to update Day-Scholar and College Bus navigation.
              </p>
            </div>
            <button
              onClick={handleReportCongestion}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs shrink-0 cursor-pointer"
            >
              Report Gate Delay
            </button>
          </div>
        </div>

        {/* Right 5 cols: Dynamic Commute Advisory & College Bus Fleet */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Commute Route Planner Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span>Smart Day-Scholar Commute Advisor</span>
              </h3>
              <span className="text-[10px] font-mono-data text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold">
                AI ROUTING
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Your Starting Location / Metro Hub:
                </label>
                <select
                  value={commuteOrigin}
                  onChange={(e) => setCommuteOrigin(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:border-blue-500 text-xs cursor-pointer"
                >
                  <option value="hazratganj">Hazratganj / Central Lucknow (~16 km)</option>
                  <option value="alambagh">Alambagh / Airport Metro Route (~11 km)</option>
                  <option value="gomtinagar">Gomti Nagar / Shaheed Path (~19 km)</option>
                  <option value="indiranagar">Indira Nagar / Polytechnic Crossing (~14 km)</option>
                  <option value="kanpur-rd">Kanpur Highway / Sarojini Nagar (~8 km)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                  Mode of Travel:
                </label>
                <div className="grid grid-cols-3 gap-2 font-semibold">
                  <button
                    onClick={() => setVehicleMode('bus')}
                    className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      vehicleMode === 'bus' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Bus className="w-3.5 h-3.5" />
                    <span>College Bus</span>
                  </button>
                  <button
                    onClick={() => setVehicleMode('two-wheeler')}
                    className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      vehicleMode === 'two-wheeler' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Bike / Scooty</span>
                  </button>
                  <button
                    onClick={() => setVehicleMode('four-wheeler')}
                    className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      vehicleMode === 'four-wheeler' ? 'bg-blue-600 text-white border-blue-600 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Car / Pool</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Recommendation Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-900 font-mono-data">RECOMMENDED ARRIVAL PATH</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Saves 16 Mins
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Take the <strong>NH-Corridor Service Flyover</strong> straight to <strong>Gate 1</strong>. Bypass Gate 3 as East Tech Park service lane is experiencing heavy morning trucks.
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono-data text-blue-800 pt-1 border-t border-blue-200/80">
                  <span>Target Departure: <strong>8:25 AM</strong></span>
                  <span>Arrival for 9:00 AM Lab: <strong>8:48 AM</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* College Bus Fleet Telemetry List */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bus className="w-4 h-4 text-blue-600" />
                <span>College Bus Fleet Live Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono-data text-slate-500 font-medium">GPS Active</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {buses.map(bus => (
                <div key={bus.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{bus.busNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-data font-bold ${
                      bus.status === 'On Time' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span className="truncate">At: {bus.currentLocation}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono-data pt-1 border-t border-slate-200/60">
                    <span className="text-slate-600">ETA to Campus: <strong className="text-blue-700">{bus.etaToCampusMins} mins</strong></span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3 h-3 text-slate-400" />
                      {bus.occupancyPercent}% Capacity
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
