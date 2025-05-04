import React from "react"

function FilterButtons({ filter, changeFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${filter === "all" ? "active" : ""}`}
        onClick={() => changeFilter("all")}
      >
        All
      </button>
      <button
        className={`filter-button ${filter === "active" ? "active" : ""}`}
        onClick={() => changeFilter("active")}
      >
        Active
      </button>
      <button
        className={`filter-button ${filter === "completed" ? "active" : ""}`}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </button>
    </div>
  )
}

export default FilterButtons
