"use client";

import { CheckIcon, PaperclipIcon, SendIcon, UserPlusIcon } from "lucide-react";
import * as React from "react";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent, BubbleReactions } from "@/components/ui/bubble";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { formatBytes } from "@/utils/number";

type Turn = {
  id: string;
  from: "them" | "us";
  author: string;
  initials: string;
  at: string;
  body: string;
};

const transcript: Turn[] = [
  {
    id: "1",
    from: "them",
    author: "Rita Okafor",
    initials: "RO",
    at: "09:14",
    body: "The deploy finished but the checkout page returns a 500 for card payments.",
  },
  {
    id: "2",
    from: "them",
    author: "Rita Okafor",
    initials: "RO",
    at: "09:14",
    body: "Only for cards. Bank transfer goes through.",
  },
  {
    id: "3",
    from: "us",
    author: "You",
    initials: "AL",
    at: "09:16",
    body: "Looking now. Which region are the failing requests coming from?",
  },
  {
    id: "4",
    from: "them",
    author: "Rita Okafor",
    initials: "RO",
    at: "09:18",
    body: "eu-west-1. I attached the log.",
  },
];

/**
 * A support thread.
 *
 * `MessageScroller` is the part worth having: it anchors the newest turn,
 * keeps the reader's place when older history is prepended, and only offers
 * the jump button when there is something below to jump to. Markers carry the
 * events that are not messages — someone joining, the ticket resolving.
 */
export function SupportChat() {
  const [draft, setDraft] = React.useState("");
  const [sending, setSending] = React.useState(false);

  return (
    <div className="flex h-128 flex-col gap-3 rounded-xl border p-3">
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent>
              <MessageScrollerItem>
                <Marker variant="separator">
                  <MarkerContent>Today</MarkerContent>
                </Marker>
              </MessageScrollerItem>

              <MessageScrollerItem>
                <Marker>
                  <MarkerIcon>
                    <UserPlusIcon />
                  </MarkerIcon>
                  <MarkerContent>Rita joined the conversation</MarkerContent>
                </Marker>
              </MessageScrollerItem>

              <MessageScrollerItem>
                <MessageGroup>
                  {transcript
                    .filter((turn) => turn.from === "them")
                    .slice(0, 2)
                    .map((turn, index) => (
                      <Message key={turn.id}>
                        <MessageAvatar>
                          <Avatar>
                            <AvatarFallback>{turn.initials}</AvatarFallback>
                          </Avatar>
                        </MessageAvatar>
                        <MessageContent>
                          {index === 0 ? (
                            <MessageHeader>
                              {turn.author} · {turn.at}
                            </MessageHeader>
                          ) : null}
                          <Bubble variant="muted">
                            <BubbleContent>{turn.body}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    ))}
                </MessageGroup>
              </MessageScrollerItem>

              <MessageScrollerItem messageId="3">
                <Message align="end">
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  {/* Reactions overhang the bubble's edge by design, so the
                      docs call for extra vertical space around a bubble that
                      has them — without it they land on the footer. */}
                  <MessageContent className="gap-4">
                    <Bubble align="end">
                      <BubbleContent>{transcript[2].body}</BubbleContent>
                      <BubbleReactions
                        align="end"
                        role="img"
                        aria-label="Reactions: thumbs up, 2 people"
                      >
                        <span>👍</span>
                        <span>2</span>
                      </BubbleReactions>
                    </Bubble>
                    <MessageFooter>Seen 09:17</MessageFooter>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

              <MessageScrollerItem messageId="4">
                <Message>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>RO</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="muted">
                      <BubbleContent>{transcript[3].body}</BubbleContent>
                    </Bubble>
                    <Attachment size="sm" className="mt-2">
                      <AttachmentMedia variant="icon">
                        <PaperclipIcon />
                      </AttachmentMedia>
                      <AttachmentContent>
                        <AttachmentTitle>checkout-500.log</AttachmentTitle>
                        <AttachmentDescription>
                          {formatBytes(48_120)}
                        </AttachmentDescription>
                      </AttachmentContent>
                    </Attachment>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>

              <MessageScrollerItem>
                <Marker variant="border">
                  <MarkerIcon>
                    <CheckIcon />
                  </MarkerIcon>
                  <MarkerContent>Ticket marked as resolved</MarkerContent>
                </Marker>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <InputGroup>
        <InputGroupTextarea
          value={draft}
          placeholder="Write a reply"
          onChange={(event) => setDraft(event.target.value)}
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="ghost"
            size="icon-xs"
            aria-label="Attach a file"
          >
            <PaperclipIcon />
          </InputGroupButton>
          <InputGroupButton
            className="ml-auto"
            disabled={!draft.trim() || sending}
            onClick={() => {
              setSending(true);
              window.setTimeout(() => {
                setSending(false);
                setDraft("");
              }, 800);
            }}
          >
            {sending ? <Spinner /> : <SendIcon />}
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
