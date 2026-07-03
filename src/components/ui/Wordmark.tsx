/**
 * The "HexSpire" wordmark: "Hex" in solid white, "Spire" in the same
 * indigo-to-violet gradient as the icon mark's inner hexagon. Capitalizing
 * both roots (vs. plain lowercase "hexspire") makes the compound name parse
 * as two words at a glance instead of one run-together block.
 */
export default function Wordmark({ style }: { style?: React.CSSProperties }) {
  return (
    <span style={style}>
      Hex
      <span
        style={{
          background: 'linear-gradient(135deg, #818cf8, #c4b5fd)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Spire
      </span>
    </span>
  );
}
