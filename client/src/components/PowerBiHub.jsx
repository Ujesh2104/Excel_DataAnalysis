import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  Video, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Sparkles,
  Layers,
  CheckCircle
} from 'lucide-react';

export default function PowerBiHub({ language = 'en', onScheduleClick }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/powerbi')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSessions(data.data || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading PowerBI sessions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Power BI Hub Banner */}
      <div className="glass-panel" style={{
        padding: '36px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 124, 65, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
          }}>
            <BarChart3 size={24} color="#ffffff" />
          </div>
          <div>
            <span className="badge badge-amber" style={{ fontSize: '11px', marginBottom: '2px' }}>
              POWER BI INTEGRATION TRACK
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
              {language === 'en' ? 'Excel to Power BI Masterclasses & Live Sessions' : 'Excel Se Power BI Live Masterclasses & Sessions'}
            </h1>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '12px 0 0 0' }}>
          {language === 'en'
            ? 'Bridge the gap between Excel spreadsheets and enterprise Business Intelligence. Learn Star Schemas, DAX calculations, and publishing automated dashboards to Power BI Service.'
            : 'Excel data models ko Power BI Desktop me connect karna, Star Schemas banana, aur DAX time intelligence ke sath interactive dashboards banana seekhein.'}
        </p>
      </div>

      {/* Live / Upcoming Sessions Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
          {language === 'en' ? 'Scheduled Live Workshops' : 'Scheduled Live Workshops'}
        </h2>

        {loading ? (
          <div className="badge badge-green">Loading sessions...</div>
        ) : sessions.length === 0 ? (
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8' }}>No upcoming Power BI sessions scheduled yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
            {sessions.map((s) => (
              <div key={s.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="badge badge-green">{s.level}</span>
                    <span style={{ fontSize: '12px', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      {s.duration}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
                    {s.title}
                  </h3>

                  <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                    Instructor: <strong style={{ color: '#38bdf8' }}>{s.instructor}</strong>
                  </p>

                  <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '16px' }}>
                    {s.description}
                  </p>

                  {/* Agenda items */}
                  {s.agenda && (
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase' }}>
                        Session Roadmap:
                      </div>
                      <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '12px', color: '#e2e8f0', lineHeight: 1.6 }}>
                        {s.agenda.map((ag, idx) => (
                          <li key={idx}>{ag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <a
                    href={s.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ padding: '8px 16px', fontSize: '12px', textDecoration: 'none' }}
                  >
                    <Video size={14} />
                    Join Live Class
                  </a>

                  <button
                    onClick={() => alert(`Downloading sample template: ${s.datasetDownload}`)}
                    className="btn-secondary"
                    style={{ padding: '8px 12px', fontSize: '12px' }}
                  >
                    <Download size={14} />
                    Sample .pbix
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Power BI Learning Path */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', marginBottom: '16px' }}>
          {language === 'en' ? 'Core Power BI Analytics Competencies' : 'Power BI Mukhya Concepts'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div className="glass-card" style={{ padding: '16px' }}>
            <h4 style={{ color: '#38bdf8', fontSize: '14px', margin: '0 0 6px 0' }}>1. Data Modeling</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
              Schema design, Active vs Inactive relationships, Cross-filter direction.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <h4 style={{ color: '#34d399', fontSize: '14px', margin: '0 0 6px 0' }}>2. DAX Expressions</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
              Evaluation context (Row vs Filter), CALCULATE modification, Time Intelligence.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '16px' }}>
            <h4 style={{ color: '#fbbf24', fontSize: '14px', margin: '0 0 6px 0' }}>3. Executive Visuals</h4>
            <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>
              Drill-down hierarchies, Tooltip pages, Dynamic Bookmarks & Button states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
