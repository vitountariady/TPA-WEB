export const mentionInputPostStyle  = {
    control: {
        backgroundColor: '#ffffff',
        fontSize: 18,
        fontWeight: 'normal',
    } as React.CSSProperties,

    '&multiLine': {
        control: {
            fontFamily: 'Calibri',
            minHeight: 63,
        } as React.CSSProperties,
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        } as React.CSSProperties,
        input: {
            padding: 9,
            border: '1px solid silver',
            display : "hidden"
        } as React.CSSProperties,
    } as React.CSSProperties,

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        } as React.CSSProperties,
        input: {
            padding: 1,
            border: '2px inset',
            display : "hidden"
        } as React.CSSProperties,
    } as React.CSSProperties,

    suggestions: {
        list: {
            backgroundColor: 'var(--primary-color-1)',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        } as React.CSSProperties,
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                color: "#ffffff",
                backgroundColor: '#00A0DC',
            },
        } as React.CSSProperties,
    } as React.CSSProperties,
} 

export const mentionInputCommentStyle = {
    control: {
        backgroundColor: 'var(--primary-color-1)',
        width: "100%",
        fontSize: 14,
        fontWeight: 'normal',
        minHeight : 50,
        maxHeight : "auto",
    } as React.CSSProperties,

    '&multiLine': {
        control: {
            fontFamily: 'Roboto',
            minHeight: 'auto',
        } as React.CSSProperties,
        highlighter: {
            padding: 0,
            border: '1px solid transparent',
            minHeight : "50px",
            maxHeight : "auto"
        } as React.CSSProperties,
        input: {
            padding: 9,
            border: '1px solid silver',
            minHeight : "50px",
            maxHeight : "auto",
        }as React.CSSProperties,
    } as React.CSSProperties,

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        } as React.CSSProperties,
        input: {
            padding: 1,
            border: '2px inset',
        } as React.CSSProperties,
    } as React.CSSProperties,

    suggestions: {
        list: {
            backgroundColor: 'var(--primary-color-1)',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        } as React.CSSProperties,
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#9dc1fc',
            },
        } as React.CSSProperties,
    } as React.CSSProperties
}

export const mentionStyle : React.CSSProperties = {
    color : "#ffffff",
    backgroundColor: "#00FFFF",
    padding: 0
}

