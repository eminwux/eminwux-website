import React from "react";

const Dot = ({ color }) => (
  <span className="dot" style={{ background: color }} />
);

export const TerminalWindow = ({ title = "bash", path = "~", children, className = "" }) => {
  return (
    <div className={`win ${className}`}>
      <div className="win-bar">
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />
        <span style={{ marginLeft: 8 }}>— {title} — {path}</span>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
};

export const Prompt = ({ cmd, user = "eminwux", host = "linux", path = "~", children }) => (
  <div style={{ marginBottom: 6 }}>
    <span className="prompt-user">{user}</span>
    <span className="prompt-arrow">@</span>
    <span className="prompt-host">{host}</span>
    <span className="prompt-arrow">:</span>
    <span className="prompt-path">{path}</span>
    <span className="prompt-arrow">$ </span>
    <span className="prompt-cmd">{cmd}</span>
    {children}
  </div>
);

export const Comment = ({ children }) => (
  <div className="comment">{children}</div>
);
