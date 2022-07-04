import React, { FunctionComponent, useEffect } from 'react'
import { Paper, List, ListItem } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'

export type TAutocompleteItem = {
    keys: string[]
    value: any
    content: string | JSX.Element
    data?: {}
}

interface TAutocompleteProps extends WithStyles<typeof styles> {
    items: TAutocompleteItem[]
    top: number
    left: number
    lineHeight: number
    selectedIndex: number
    parentContainer?: string
    onClick: (selectedIndex: number) => void
}

const styles = () => createStyles({
    container: {
        minWidth: "200px",
        position: "absolute",
        zIndex: 10
    },
    item: {
        cursor: "pointer"
    }
})

const Autocomplete: FunctionComponent<TAutocompleteProps> = (props) => {
    let lineHeight = props.lineHeight;

    if (!props.items.length) {
        return null
    }

    const setTransform = () => {
        let el = document.getElementById("autocomplete-box")
        if (!el) return;
        var rect = el.getBoundingClientRect();

        let containerEl = props?.parentContainer && document.getElementById(props.parentContainer)
        var container = {bottom: 0, right: 0}
        if (containerEl) {
            container = containerEl.getBoundingClientRect();
        } else {
            container = {
                bottom: (window.innerHeight || document.documentElement.clientHeight),
                right: (window.innerWidth || document.documentElement.clientWidth)
            }
        }        
        
        const outsideBottom: number = (props.top + rect.bottom) - container.bottom
        const outsideRight: number = (props.left + rect.right) - container.right
    
        let xOffset: number = 0
        let yOffset: number = 0
        if (outsideBottom > 0) yOffset = -outsideBottom
        if (outsideRight > 0) xOffset = -outsideRight

        el.style.top = `${props.top + (yOffset === 0 ? lineHeight : 0)}px`
        el.style.left = `${props.left + xOffset}px`

        if (yOffset < 0) {
            el.style.transform = `translate(0, -100%)`
        } else {
            el.style.transform = `translate(0, 0)`
        }
    }

    useEffect(() => {
        setTransform()
    }, [props.top, props.left])

    const { classes } = props
    return (
        <Paper id="autocomplete-box" className={classes.container}>
            <List dense={true}>
                {props.items.map((item, index) => (
                    <ListItem
                        key={index}
                        className={classes.item}
                        selected={index === props.selectedIndex}
                        onClick={() => props.onClick(index)}
                    >
                        {item.content}
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default withStyles(styles, { withTheme: true })(Autocomplete)
