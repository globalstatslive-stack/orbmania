import React from 'react';
import { ORBMANIA_COLORS } from '../styles/colors';

export interface HUDProps {
  energy: number;
  health: number;
  score: number;
  dashCooldown: number;
  abilityCooldown: number;
  orbitSlots: number;
  maxOrbitSlots: number;
}

export const HUD: React.FC<HUDProps> = ({
  energy,
  health,
  score,
  dashCooldown,
  abilityCooldown,
  orbitSlots,
  maxOrbitSlots,
}) => {
  const formatCooldown = (cooldown: number): string => {
    if (cooldown <= 0) return 'READY';
    return `${(cooldown / 1000).toFixed(1)}s`;
  };

  const ProgressBar: React.FC<{
    value: number;
    max: number;
    color: string;
    label: string;
  }> = ({ value, max, color, label }) => (
    <div style={{ marginBottom: '0.5rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: ORBMANIA_COLORS.TEXT_SECONDARY,
        marginBottom: '0.2rem',
      }}>
        <span>{label}</span>
        <span>{Math.round(value)}/{max}</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: ORBMANIA_COLORS.SURFACE,
        borderRadius: '4px',
        overflow: 'hidden',
        border: `1px solid ${ORBMANIA_COLORS.SURFACE_LIGHT}`,
      }}>
        <div style={{
          width: `${Math.min((value / max) * 100, 100)}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease',
          boxShadow: `0 0 10px ${color}`,
        }} />
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      width: '250px',
      padding: '1rem',
      backgroundColor: `${ORBMANIA_COLORS.BACKGROUND}CC`,
      border: `1px solid ${ORBMANIA_COLORS.SURFACE_LIGHT}`,
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      fontFamily: 'monospace',
      zIndex: 1000,
    }}>
      {/* Health Bar */}
      <ProgressBar
        value={health}
        max={100}
        color={ORBMANIA_COLORS.RED}
        label="HEALTH"
      />

      {/* Energy Bar */}
      <ProgressBar
        value={energy}
        max={1000}
        color={ORBMANIA_COLORS.CYAN}
        label="ENERGY"
      />

      {/* Score */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
      }}>
        <span style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY }}>SCORE</span>
        <span style={{ color: ORBMANIA_COLORS.AMBER }}>{score.toLocaleString()}</span>
      </div>

      {/* Orbit Slots */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        fontSize: '0.9rem',
      }}>
        <span style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY }}>ORBIT SLOTS</span>
        <span style={{ color: ORBMANIA_COLORS.GREEN }}>
          {orbitSlots}/{maxOrbitSlots}
        </span>
      </div>

      {/* Cooldowns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.5rem',
        fontSize: '0.8rem',
      }}>
        <div style={{
          padding: '0.5rem',
          backgroundColor: ORBMANIA_COLORS.SURFACE,
          borderRadius: '6px',
          textAlign: 'center',
          border: `1px solid ${dashCooldown > 0 ? ORBMANIA_COLORS.RED : ORBMANIA_COLORS.GREEN}`,
        }}>
          <div style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY, marginBottom: '0.2rem' }}>
            DASH
          </div>
          <div style={{
            color: dashCooldown > 0 ? ORBMANIA_COLORS.RED : ORBMANIA_COLORS.GREEN,
            fontWeight: 'bold',
          }}>
            {formatCooldown(dashCooldown)}
          </div>
        </div>

        <div style={{
          padding: '0.5rem',
          backgroundColor: ORBMANIA_COLORS.SURFACE,
          borderRadius: '6px',
          textAlign: 'center',
          border: `1px solid ${abilityCooldown > 0 ? ORBMANIA_COLORS.RED : ORBMANIA_COLORS.GREEN}`,
        }}>
          <div style={{ color: ORBMANIA_COLORS.TEXT_SECONDARY, marginBottom: '0.2rem' }}>
            ABILITY
          </div>
          <div style={{
            color: abilityCooldown > 0 ? ORBMANIA_COLORS.RED : ORBMANIA_COLORS.GREEN,
            fontWeight: 'bold',
          }}>
            {formatCooldown(abilityCooldown)}
          </div>
        </div>
      </div>
    </div>
  );
};