import styles from './styles/Dropdown.module.css'
import PropTypes from "prop-types";
import Button from "../../inputs/button/Button";
import React from "react";

export default function DropdownOption(props) {
  return (
    <div data-keepalive={`${props.option.keepAlive}`} style={{width: '100%'}}>
      <Button
        disabled={props.option.disabled}
        onClick={() => {
          props.option.onClick(props.option.onClickEvent)
        }}
        className={styles.button}>
        <div className={styles.iconSpace}>
          {props.option.icon}
        </div>

        <div className={[styles.buttonLabel, styles.overflow].join(' ')}>
          {props.option.label}
        </div>
        {props.option.shortcut ?
          <div className={styles.shortcut}>
            {props.option.shortcut}
          </div>
          :
          null}

      </Button>
    </div>
  )
}
DropdownOption.propTypes = {

  option: PropTypes.shape({
    label: PropTypes.any,
    icon: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    keepAlive: PropTypes.bool,
    shortcut: PropTypes.string
  })
}
