'use client';

import { ORBMANIA_COLORS } from '@orbmania/ui';

export default function HomePage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${ORBMANIA_COLORS.BACKGROUND} 0%, ${ORBMANIA_COLORS.SURFACE} 100%)`,
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '800px',
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: `linear-gradient(45deg, ${ORBMANIA_COLORS.CYAN}, ${ORBMANIA_COLORS.AMBER})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: `0 0 20px ${ORBMANIA_COLORS.CYAN}`,
        }}>
          Orbmania.io
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: ORBMANIA_COLORS.TEXT_SECONDARY,
          marginBottom: '2rem',
          lineHeight: '1.6',
        }}>
          Master the art of orbital energy combat in this original multiplayer arena
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: `2px solid ${ORBMANIA_COLORS.GREEN}`,
            backgroundColor: 'transparent',
            color: ORBMANIA_COLORS.GREEN,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = ORBMANIA_COLORS.GREEN;
            e.currentTarget.style.color = ORBMANIA_COLORS.BACKGROUND;
            e.currentTarget.style.boxShadow = `0 0 20px ${ORBMANIA_COLORS.GREEN}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = ORBMANIA_COLORS.GREEN;
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Enter Arena
          </button>

          <button style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: `2px solid ${ORBMANIA_COLORS.AMBER}`,
            backgroundColor: 'transparent',
            color: ORBMANIA_COLORS.AMBER,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = ORBMANIA_COLORS.AMBER;
            e.currentTarget.style.color = ORBMANIA_COLORS.BACKGROUND;
            e.currentTarget.style.boxShadow = `0 0 20px ${ORBMANIA_COLORS.AMBER}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = ORBMANIA_COLORS.AMBER;
            e.currentTarget.style.boxShadow = 'none';
          }}>
            How to Play
          </button>
        </div>

        <div style={{
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '600px',
          margin: '3rem auto 0',
        }}>
          <div style={{
            padding: '1.5rem',
            border: `1px solid ${ORBMANIA_COLORS.SURFACE_LIGHT}`,
            borderRadius: '12px',
            backgroundColor: ORBMANIA_COLORS.SURFACE,
          }}>
            <h3 style={{ color: ORBMANIA_COLORS.CYAN, marginBottom: '0.5rem' }}>
              Orbital Energy
            </h3>
            <p style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY, fontSize: '0.9rem' }}>
              Collect energy shards that orbit your core. Each shard increases your combat potential.
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            border: `1px solid ${ORBMANIA_COLORS.SURFACE_LIGHT}`,
            borderRadius: '12px',
            backgroundColor: ORBMANIA_COLORS.SURFACE,
          }}>
            <h3 style={{ color: ORBMANIA_COLORS.AMBER, marginBottom: '0.5rem' }}>
              Pulse Dash
            </h3>
            <p style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY, fontSize: '0.9rem' }}>
              Phase through enemy orbits with reduced damage. Master timing for tactical advantage.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}