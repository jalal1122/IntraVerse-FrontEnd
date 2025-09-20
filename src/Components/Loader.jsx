import styled from "styled-components";
import { useSelector } from "react-redux";

const Loader = () => {
  const { primaryColor } = useSelector((s) => s.color.colors);
  return (
    <StyledWrapper style={{ "--accent": primaryColor }}>
      <div className="w-full h-[60vh] flex items-center justify-center bg-[#0b0b0b]">
        <div className="loader">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    --size: 56px;
    position: relative;
    width: var(--size);
    height: var(--size);
  }
  .loader span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 3px solid transparent;
    animation: ring 1.2s linear infinite;
  }
  .loader span:nth-child(1) {
    border-top-color: var(--accent);
  }
  .loader span:nth-child(2) {
    border-right-color: color-mix(in srgb, var(--accent) 70%, white);
    animation-delay: -0.2s;
  }
  .loader span:nth-child(3) {
    border-bottom-color: color-mix(in srgb, var(--accent) 50%, white);
    animation-delay: -0.4s;
  }
  .loader span:nth-child(4) {
    border-left-color: color-mix(in srgb, var(--accent) 30%, white);
    animation-delay: -0.6s;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg) scale(0.9);
    }
    50% {
      transform: rotate(180deg) scale(1);
    }
    100% {
      transform: rotate(360deg) scale(0.9);
    }
  }
`;

export default Loader;
