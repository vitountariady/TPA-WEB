import { useMutation } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeHashtag } from '../queries/queries'
import MentionText from './Components/MentionText'

const CommentContentTemplate = ({ texts, }: { texts: string[] }) => {
    const HastagRichText1 = /#[a-z0-9A-Z]+/g
    const HastagRichText2 = /@\[#[a-z0-9A-Z]+/g
    const MentionRichText = /@[a-z0-9A-Z]+/g
    const URLRichText = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._]{2,1000}\.\b([a-zA-Z0-9@:%_\+.#?&//=]*)/g
    return (
        <p className='richText'>
            {
                texts.map((text) => {
                    if (text.match(HastagRichText2)) {
                        let firstIndexHastag = text.indexOf('[');
                        let lastIndexHastag = text.indexOf(']');
                        let hashtagSubString = text.substring(firstIndexHastag + 1, lastIndexHastag)
                        let hashtagID = text.substring(firstIndexHastag + 2, lastIndexHastag)
                        return <Link to='/'>{hashtagSubString} &nbsp;</Link>
                    } else if (text.match(HastagRichText1)) {
                        let hastagUrl = text.substring(1, text.length)
                        return <Link to='/'>{text} &nbsp;</Link>
                    } else if (text.match(URLRichText)) {
                        console.log(text)
                        return <a target="_blank" rel="noopener noreferrer" href={text}>{text} &nbsp;</a>
                    } else if (text.match(MentionRichText)) {
                        return <MentionText text={text} />
                    } else {
                        return <span className="text-black text-s">{text} &nbsp;</span>
                    }
                })
            }
        </p>
    )
}

export default CommentContentTemplate