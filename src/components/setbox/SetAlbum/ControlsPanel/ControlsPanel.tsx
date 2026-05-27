import { LayoutGrid, BookOpen } from "lucide-react";
import css from "./ControlsPanel.module.css";

interface ControlsPanelProps {
  setName: string;
  viewMode: "binder" | "grid";
  setViewMode: (mode: "binder" | "grid") => void;
}

export const ControlsPanel = ({ setName, viewMode, setViewMode }: ControlsPanelProps) => {
  return (
    <div className={css.controlsPanel}>
      <div className={css.modeToggle}>
        <button
          onClick={() => setViewMode("binder")}
          className={`${css.toggleBtn} ${viewMode === "binder" ? css.active : ""}`}
        >
          <BookOpen size={18} />
          Альбом
        </button>

        <button
          onClick={() => setViewMode("grid")}
          className={`${css.toggleBtn} ${viewMode === "grid" ? css.active : ""}`}
        >
          <LayoutGrid size={18} />
          Вся сітка
        </button>
      </div>

      <div className={css.headerInfo}>
        <h1 className={css.albumTitle}>{setName}</h1>
      </div>

      <div className={css.spacer}></div>
    </div>
  );
};