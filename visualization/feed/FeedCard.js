import PropTypes from "prop-types";
import styles from './styles/Card.module.css'
import React from "react";

export default function FeedCard(props) {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardImage}>
                <img src={props.image} alt={props.title} style={{width: '100%'}}/>
            </div>
            <div className={styles.cardContent}>

                <div className={styles.header}>
                    {props.title}
                </div>
                <div className={styles.description}>
                    {props.description}
                </div>

            </div>


            <div className={styles.category}>
                {props.category}
            </div>


        </div>
    )
}

FeedCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}