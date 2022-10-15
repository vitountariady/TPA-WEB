import { useState } from "react"
import { Link } from "react-router-dom";

export default function MentionText({ text }: { text: string }) {
    let firstIndexMentionTag = text.indexOf('[');
    let lastIndexMentionTag = text.indexOf(']');
    let mentionTagSubString = text.substring(firstIndexMentionTag + 1, lastIndexMentionTag)

    let firstIndexUserId = text.indexOf('(')
    let lastIndexUserId = text.indexOf(')')
    let userIdSubString = text.substring(firstIndexUserId + 1, lastIndexUserId)

    return (
        <span className="text-black text-m">
        <Link to={`/profile/${userIdSubString}`}>{mentionTagSubString} &nbsp;</Link>
        </span>
    )
}