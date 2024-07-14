import React from "react";
import { MdAdd } from "react-icons/md";
import "../../styles/PageHeader.css"

const PageHeader = ({titleHeader, onClickHandle}) => {
	return (
		<div className="PageHeader">
        <h2>{titleHeader}</h2>
        <button className="AddButton" onClick={onClickHandle}>
          <MdAdd /> Add {titleHeader}
        </button>
      </div>
	)
}

export default PageHeader;