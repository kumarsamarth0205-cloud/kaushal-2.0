import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
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
  Filter,
  Phone,
  AlertCircle
} from 'lucide-react';

interface CampusMobilityPageProps {
  lang: Language;
  onNavigate: (page: string) => void;
}

interface CampusGate {
  id: string;
  name: string;
  nameHi: string;
  location: string;
  congestionPercent: number; // e.g. 85%, 48%, 15%
  status: 'Heavy' | 'Moderate' | 'Smooth';
  avgWaitMins: number;
  vehiclesPerHour: number;
  recommendedEntry: boolean;
  advisory: string;
  advisoryHi: string;
}

interface BusRouteTelemetry {
  id: string;
  busNumber: string;
  routeName: string;
  routeNameHi: string;
  origin: string;
  currentStop: string;
  etaFor9AmLab: string;
  etaMins: number;
  occupancyPercent: number;
  status: 'On-Time' | 'Slight Delay' | 'Heavy Delay';
  delayMins: number;
  driverName: string;
  driverPhone: string;
  vehicleNo: string;
}

export const CampusMobilityPage: React.FC<CampusMobilityPageProps> = ({ lang, onNavigate }) => {
  const [selectedGate, setSelectedGate] = useState<string>('gate-1');
  const [vehicleMode, setVehicleMode] = useState<'bus' | 'two-wheeler' | 'four-wheeler'>('bus');
  const [commuteOrigin, setCommuteOrigin] = useState<string>('hazratganj');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [telemetryTime, setTelemetryTime] = useState<string>('08:24 AM (Live Telemetry)');
  const [reportedIncident, setReportedIncident] = useState<string | null>(null);

  // Exact 3 Institutional Gates matching specification
  const [gates, setGates] = useState<CampusGate[]>([
    {
      id: 'gate-1',
      name: 'Main Highway Gate (Front Portal)',
      nameHi: 'मेन हाईवे गेट (मुख्य प्रवेश द्वार)',
      location: 'National Highway Corridor (Front Entrance)',
      congestionPercent: 85,
      status: 'Heavy',
      avgWaitMins: 18,
      vehiclesPerHour: 840,
      recommendedEntry: false,
      advisory: '85% Heavy Congestion — Reroute via Gate 2 North to save 18 mins before 9:00 AM labs!',
      advisoryHi: '८५% भारी जाम — ९ बजे की लैब के लिए गेट २ नॉर्थ से जाएं और १८ मिनट बचाएं!'
    },
    {
      id: 'gate-2',
      name: 'Gate 2 North (Hostel & Sports Complex)',
      nameHi: 'गेट २ नॉर्थ (छात्रावास व खेल परिसर)',
      location: 'North Ring Road Bypass',
      congestionPercent: 48,
      status: 'Moderate',
      avgWaitMins: 6,
      vehiclesPerHour: 420,
      recommendedEntry: true,
      advisory: 'Recommended Alternate Entry · Smooth transit with minimal bottleneck.',
      advisoryHi: 'अनुशंसित वैकल्पिक प्रवेश द्वार · सुगम आवागमन व न्यूनतम प्रतीक्षा समय।'
    },
    {
      id: 'gate-3',
      name: 'Gate 3 Faculty & EV Express Entry',
      nameHi: 'गेट ३ फैकल्टी एवं ईवी एक्सप्रेस प्रवेश',
      location: 'East Tech Park Service Road',
      congestionPercent: 15,
      status: 'Smooth',
      avgWaitMins: 2,
      vehiclesPerHour: 180,
      recommendedEntry: false,
      advisory: 'Priority Lane for Electric Vehicles, Campus Transit Buses & Faculty Shuttles.',
      advisoryHi: 'इलेक्ट्रिक वाहनों, कॉलेज बसों और फैकल्टी के लिए प्राथमिकता लेन।'
    }
  ]);

  // Exact 6 College Bus Fleet Telemetry routes matching specification
  const [buses, setBuses] = useState<BusRouteTelemetry[]>([
    {
      id: 'bus-01',
      busNumber: 'Bus 04',
      routeName: 'Hazratganj Express (Corridor A)',
      routeNameHi: 'हज़रतगंज एक्सप्रेस (रूट १)',
      origin: 'Hazratganj Chauraha',
      currentStop: 'Alambagh Metro Flyover',
      etaFor9AmLab: '8:42 AM (14 mins left)',
      etaMins: 14,
      occupancyPercent: 88,
      status: 'On-Time',
      delayMins: 1,
      driverName: 'R. K. Yadav',
      driverPhone: '+91 94150 28411',
      vehicleNo: 'UP 32 CN 4812'
    },
    {
      id: 'bus-02',
      busNumber: 'Bus 08',
      routeName: 'Gomti Nagar Shuttle (Corridor B)',
      routeNameHi: 'गोमती नगर शटल (रूट २)',
      origin: 'Patrakarpuram Market',
      currentStop: 'Polytechnic Chauraha Service Lane',
      etaFor9AmLab: '8:51 AM (22 mins left)',
      etaMins: 22,
      occupancyPercent: 94,
      status: 'Slight Delay',
      delayMins: 6,
      driverName: 'M. P. Singh',
      driverPhone: '+91 94500 12845',
      vehicleNo: 'UP 32 DN 1904'
    },
    {
      id: 'bus-03',
      busNumber: 'Bus 12',
      routeName: 'Indira Nagar Metro Feeder (Corridor C)',
      routeNameHi: 'इंदिरा नगर मेट्रो फीडर (रूट ३)',
      origin: 'Munshipulia Metro Station',
      currentStop: 'Kalyanpur Crossing',
      etaFor9AmLab: '8:38 AM (9 mins left)',
      etaMins: 9,
      occupancyPercent: 72,
      status: 'On-Time',
      delayMins: 0,
      driverName: 'Arvind Kumar',
      driverPhone: '+91 98391 44521',
      vehicleNo: 'UP 32 EN 7721'
    },
    {
      id: 'bus-04',
      busNumber: 'Bus 16',
      routeName: 'Kanpur Highway Express (Corridor D)',
      routeNameHi: 'कानपुर हाईवे एक्सप्रेस (रूट ४)',
      origin: 'Sarojini Nagar Market',
      currentStop: 'Amausi Airport Intersection',
      etaFor9AmLab: '8:57 AM (28 mins left)',
      etaMins: 28,
      occupancyPercent: 98,
      status: 'Heavy Delay',
      delayMins: 12,
      driverName: 'Suresh Verma',
      driverPhone: '+91 99352 11984',
      vehicleNo: 'UP 32 FN 5510'
    },
    {
      id: 'bus-05',
      busNumber: 'Bus 21',
      routeName: 'Aliganj & Kapoorthala Line (Corridor E)',
      routeNameHi: 'अलीगंज एवं कपूरथला लाइन (रूट ५)',
      origin: 'Kapoorthala Complex',
      currentStop: 'IT College Chauraha',
      etaFor9AmLab: '8:44 AM (16 mins left)',
      etaMins: 16,
      occupancyPercent: 82,
      status: 'On-Time',
      delayMins: 2,
      driverName: 'Rajesh Tiwari',
      driverPhone: '+91 97920 33418',
      vehicleNo: 'UP 32 GN 8832'
    },
    {
      id: 'bus-06',
      busNumber: 'Bus 27',
      routeName: 'Ashiyana & Telibagh Connector (Corridor F)',
      routeNameHi: 'आशियाना एवं तेलीबाग कनेक्टर (रूट ६)',
      origin: 'Bangla Bazar Market',
      currentStop: 'SGPGI Junction Gate',
      etaFor9AmLab: '8:49 AM (21 mins left)',
      etaMins: 21,
      occupancyPercent: 85,
      status: 'On-Time',
      delayMins: 1,
      driverName: 'Devendra Nath',
      driverPhone: '+91 93361 77290',
      vehicleNo: 'UP 32 HN 3319'
    }
  ]);

  const handleRefreshSensors = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setGates(prev => prev.map(g => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newCongestion = Math.min(95, Math.max(10, g.congestionPercent + delta));
        return {
          ...g,
          congestionPercent: newCongestion,
          avgWaitMins: Math.round(newCongestion * 0.22)
        };
      }));
      setTelemetryTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (Live Updated)');
      setIsRefreshing(false);
    }, 600);
  };

  const handleReportIncident = () => {
    setReportedIncident('Incident Report Logged: Campus Security & Fleet Transit alerted to bypass Gate 1.');
    setTimeout(() => setReportedIncident(null), 4500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-2">
      
      {/* Toast Alert */}
      {reportedIncident && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{reportedIncident}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Campus Telemetry Engine · Live</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono-data">Gate Congestion & 6 Bus Corridors</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Smart Campus Mobility & Traffic Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Real-time entry gate telemetry, college bus fleet GPS tracking, and automated rerouting advisories engineered to eliminate 9:00 AM lab bottlenecks for 2nd-year students & faculty.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="text-[11px] font-mono-data text-slate-500 hidden sm:block">
            {telemetryTime}
          </div>
          <button
            onClick={handleRefreshSensors}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-600'}`} />
            <span>Refresh Telemetry</span>
          </button>
        </div>
      </div>

      {/* PILLAR 2 PART A: LIVE GATE CONGESTION METERS (3 CARDS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase font-mono-data tracking-wider">
            Live Entry Gate Congestion Radar
          </h2>
          <span className="text-xs text-slate-500 font-mono-data">Updated every 15s</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {gates.map(gate => {
            const isHeavy = gate.status === 'Heavy';
            const isModerate = gate.status === 'Moderate';
            const isSmooth = gate.status === 'Smooth';

            return (
              <div
                key={gate.id}
                onClick={() => setSelectedGate(gate.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  selectedGate === gate.id
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md bg-white'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      {gate.name}
                    </span>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono-data font-bold uppercase tracking-wider shrink-0 ${
                      isHeavy 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : isModerate 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {gate.congestionPercent}% {gate.status}
                    </span>
                  </div>

                  {/* Congestion Gauge Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono-data text-slate-500">
                      <span>Wait Time: <strong className="text-slate-800">{gate.avgWaitMins} mins</strong></span>
                      <span>Flow: <strong className="text-slate-800">{gate.vehiclesPerHour} v/hr</strong></span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isHeavy ? 'bg-rose-600' : isModerate ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${gate.congestionPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Advisory Notice */}
                  <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                    gate.recommendedEntry 
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium'
                      : isHeavy 
                        ? 'bg-rose-50 border border-rose-200 text-rose-900 font-medium'
                        : 'bg-slate-50 border border-slate-200 text-slate-700'
                  }`}>
                    {gate.recommendedEntry ? '⚡ ' : isHeavy ? '⚠️ ' : 'ℹ️ '}
                    {gate.advisory}
                  </div>
                </div>

                <div className="text-[11px] font-mono-data text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span>{gate.location}</span>
                  {gate.recommendedEntry && (
                    <span className="text-emerald-700 font-bold">Recommended Entry</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PILLAR 2 PART B: COLLEGE BUS FLEET TELEMETRY (6 ROUTES) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bus className="w-4 h-4 text-blue-600" />
              <span>College Bus Fleet Live Telemetry (6 Campus Corridors)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Live tracking for students commuting to 9:00 AM engineering labs and lectures across Lucknow & Kanpur corridors.
            </p>
          </div>

          <button
            onClick={handleReportIncident}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Report Congestion / Jam</span>
          </button>
        </div>

        {/* Fleet Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-600 font-mono-data text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Bus No.</th>
                <th className="p-3">Route Corridor</th>
                <th className="p-3">Current Stop</th>
                <th className="p-3">ETA (9:00 AM Labs)</th>
                <th className="p-3">Transit Status</th>
                <th className="p-3">Occupancy</th>
                <th className="p-3">Driver Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {buses.map(bus => {
                const isOnTime = bus.status === 'On-Time';
                const isSlight = bus.status === 'Slight Delay';
                const isHeavy = bus.status === 'Heavy Delay';

                return (
                  <tr key={bus.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono-data font-bold text-blue-700 whitespace-nowrap">
                      {bus.busNumber}
                      <span className="block text-[10px] text-slate-400 font-normal">{bus.vehicleNo}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-900">{bus.routeName}</div>
                      <div className="text-[11px] text-slate-500 font-mono-data">From: {bus.origin}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5 text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{bus.currentStop}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono-data font-bold text-slate-900 whitespace-nowrap">
                      {bus.etaFor9AmLab}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10.5px] font-mono-data font-bold ${
                        isOnTime 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isSlight 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {bus.status} {bus.delayMins > 0 ? `(+${bus.delayMins}m)` : ''}
                      </span>
                    </td>
                    <td className="p-3 font-mono-data whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{bus.occupancyPercent}%</span>
                        <div className="w-12 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${bus.occupancyPercent > 90 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${bus.occupancyPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap font-mono-data text-[11px]">
                      <div className="text-slate-800 font-medium">{bus.driverName}</div>
                      <a href={`tel:${bus.driverPhone}`} className="text-blue-600 hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{bus.driverPhone}</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SMART COMMUTE ADVISOR WIDGET */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-blue-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800/80 pb-4">
          <div>
            <span className="text-[10px] font-mono-data text-amber-400 font-bold uppercase tracking-wider">
              DAY-SCHOLAR COMMUTE PLANNER
            </span>
            <h3 className="text-lg font-bold text-white">
              Avoid Morning Traffic & Arrival Penalties
            </h3>
          </div>
          <span className="text-xs font-mono-data text-emerald-400">
            Calculated for 9:00 AM Attendance Bar
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Select Commute Origin:</label>
            <select
              value={commuteOrigin}
              onChange={e => setCommuteOrigin(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-blue-900/50 border border-blue-700 text-white text-xs focus:outline-none focus:border-blue-400"
            >
              <option value="hazratganj">Hazratganj (14 km)</option>
              <option value="gomti-nagar">Gomti Nagar (18 km)</option>
              <option value="alambagh">Alambagh (9 km)</option>
              <option value="indira-nagar">Indira Nagar (12 km)</option>
              <option value="sarojini-nagar">Sarojini Nagar / Airport (21 km)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium">Travel Mode:</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-blue-900/60 rounded-xl border border-blue-700">
              <button
                type="button"
                onClick={() => setVehicleMode('bus')}
                className={`py-1.5 rounded-lg text-center font-bold text-xs transition-colors ${vehicleMode === 'bus' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              >
                Bus
              </button>
              <button
                type="button"
                onClick={() => setVehicleMode('two-wheeler')}
                className={`py-1.5 rounded-lg text-center font-bold text-xs transition-colors ${vehicleMode === 'two-wheeler' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              >
                Bike
              </button>
              <button
                type="button"
                onClick={() => setVehicleMode('four-wheeler')}
                className={`py-1.5 rounded-lg text-center font-bold text-xs transition-colors ${vehicleMode === 'four-wheeler' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              >
                Car
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-900/40 border border-blue-700/80 flex flex-col justify-center space-y-1">
            <span className="text-[10px] text-amber-300 font-mono-data font-bold">RECOMMENDED SMART PATH:</span>
            <div className="text-xs font-bold text-white">
              Take Bypass to Gate 2 North (Arrival: 8:44 AM)
            </div>
            <div className="text-[11px] text-emerald-300 font-mono-data">
              Saves 18 mins vs Main Highway Gate
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
