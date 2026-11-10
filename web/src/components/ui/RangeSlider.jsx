import styled, { css } from 'styled-components'

const thumb = css`
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);
  cursor: pointer;
  pointer-events: auto;
`

const Wrapper = styled.div`
  position: relative;
  height: 22px;
`

const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  transform: translateY(-50%);
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primarySoft};
`

const Fill = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
`

const Range = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  margin: 0;
  appearance: none;
  background: transparent;
  pointer-events: ${({ $dual }) => ($dual ? 'none' : 'auto')};

  &::-webkit-slider-thumb {
    ${thumb}
  }
  &::-moz-range-thumb {
    ${thumb}
  }
  &:focus-visible {
    outline: none;
  }
  &:focus-visible::-webkit-slider-thumb {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

const percent = (value, min, max) => ((value - min) / (max - min)) * 100

// Slider simple: value es un número
export function RangeSlider({ min, max, step = 1, value, onChange, label }) {
  return (
    <Wrapper>
      <Track>
        <Fill style={{ left: 0, width: `${percent(value, min, max)}%` }} />
      </Track>
      <Range
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Wrapper>
  )
}

// Slider doble: value es [mínimo, máximo]
export function DualRangeSlider({ min, max, step = 1, value, onChange, labels = ['Mínimo', 'Máximo'] }) {
  const [low, high] = value
  return (
    <Wrapper>
      <Track>
        <Fill style={{ left: `${percent(low, min, max)}%`, width: `${percent(high, min, max) - percent(low, min, max)}%` }} />
      </Track>
      <Range
        $dual
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        aria-label={labels[0]}
        onChange={(e) => onChange([Math.min(Number(e.target.value), high - step), high])}
      />
      <Range
        $dual
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        aria-label={labels[1]}
        onChange={(e) => onChange([low, Math.max(Number(e.target.value), low + step)])}
      />
    </Wrapper>
  )
}
