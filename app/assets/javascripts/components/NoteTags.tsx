import { AppState } from '@/ui_models/app_state';
import { observer } from 'mobx-react-lite';
import { toDirective, useCloseOnClickOutside } from './utils';
import { Icon } from './Icon';
import { AutocompleteTagInput } from './AutocompleteTagInput';
import { WebApplication } from '@/ui_models/application';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { SNTag } from '@standardnotes/snjs';

type Props = {
  application: WebApplication;
  appState: AppState;
};

const TAGS_ROW_HEIGHT = 36;
const MIN_OVERFLOW_TOP = 76;
const TAG_RIGHT_MARGIN = 8;

const NoteTags = observer(({ application, appState }: Props) => {
  const {
    overflowedTagsCount,
    tags,
    tagsContainerPosition,
    tagsContainerMaxWidth,
    tagsContainerExpanded,
    tagsOverflowed,
  } = appState.activeNote;

  const [tagsContainerHeight, setTagsContainerHeight] =
    useState(TAGS_ROW_HEIGHT);
  const [overflowCountPosition, setOverflowCountPosition] = useState(0);

  const containerRef = useRef<HTMLDivElement>();
  const tagsContainerRef = useRef<HTMLDivElement>();
  const tagsRef = useRef<HTMLButtonElement[]>([]);
  const overflowButtonRef = useRef<HTMLButtonElement>();

  useCloseOnClickOutside(
    tagsContainerRef,
    (expanded: boolean) => {
      if (overflowButtonRef.current || tagsContainerExpanded) {
        appState.activeNote.setTagsContainerExpanded(expanded);
      }
    }
  );

  const onTagBackspacePress = async (tag: SNTag) => {
    await appState.activeNote.removeTagFromActiveNote(tag);

    if (tagsRef.current.length > 1) {
      tagsRef.current[tagsRef.current.length - 1].focus();
    }
  };

  const isTagOverflowed = useCallback(
    (tagElement?: HTMLButtonElement): boolean | undefined => {
      if (!tagElement) {
        return;
      }
      if (tagsContainerExpanded) {
        return false;
      }
      return tagElement.getBoundingClientRect().top >= MIN_OVERFLOW_TOP;
    },
    [tagsContainerExpanded]
  );

  const reloadOverflowCountPosition = useCallback(() => {
    const firstOverflowedTagIndex = tagsRef.current.findIndex((tagElement) =>
      isTagOverflowed(tagElement)
    );
    if (tagsContainerExpanded || firstOverflowedTagIndex < 1) {
      return;
    }
    const previousTagRect =
      tagsRef.current[firstOverflowedTagIndex - 1].getBoundingClientRect();
    const position =
      previousTagRect.right - (tagsContainerPosition ?? 0) + TAG_RIGHT_MARGIN;
    setOverflowCountPosition(position);
  }, [isTagOverflowed, tagsContainerExpanded, tagsContainerPosition]);

  const reloadTagsContainerHeight = useCallback(() => {
    const height = tagsContainerExpanded
      ? tagsContainerRef.current.scrollHeight
      : TAGS_ROW_HEIGHT;
    setTagsContainerHeight(height);
  }, [tagsContainerExpanded]);

  const reloadOverflowCount = useCallback(() => {
    const count = tagsRef.current.filter((tagElement) =>
      isTagOverflowed(tagElement)
    ).length;
    appState.activeNote.setOverflowedTagsCount(count);
  }, [appState.activeNote, isTagOverflowed]);

  const setTagsContainerExpanded = (expanded: boolean) => {
    appState.activeNote.setTagsContainerExpanded(expanded);
  };

  useEffect(() => {
    appState.activeNote.reloadTagsContainerLayout();
    reloadOverflowCountPosition();
    reloadTagsContainerHeight();
    reloadOverflowCount();
  }, [
    appState.activeNote,
    reloadOverflowCountPosition,
    reloadTagsContainerHeight,
    reloadOverflowCount,
    tags,
  ]);

  const tagClass = `bg-contrast border-0 rounded text-xs color-text py-1 pr-2 flex items-center 
    mt-2 cursor-pointer hover:bg-secondary-contrast focus:bg-secondary-contrast`;

  return (
    <div className="flex" ref={containerRef} style={{ height: tagsContainerHeight }}>
      <div
        ref={tagsContainerRef}
        className={`absolute flex flex-wrap pl-1 -ml-1 ${
          tagsContainerExpanded ? '' : 'overflow-hidden'
        }`}
        style={{
          maxWidth: tagsContainerMaxWidth,
          height: TAGS_ROW_HEIGHT,
        }}
      >
        {tags.map((tag: SNTag, index: number) => (
          <button
            className={`${tagClass} pl-1 mr-2`}
            style={{ maxWidth: tagsContainerMaxWidth }}
            ref={(element) => {
              if (element) {
                tagsRef.current[index] = element;
              }
            }}
            onKeyUp={(event) => {
              if (event.key === 'Backspace') {
                onTagBackspacePress(tag);
              }
            }}
            tabIndex={isTagOverflowed(tagsRef.current[index]) ? -1 : 0}
          >
            <Icon
              type="hashtag"
              className="sn-icon--small color-neutral mr-1"
            />
            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              {tag.title}
            </span>
          </button>
        ))}
        <AutocompleteTagInput
          application={application}
          appState={appState}
          tagsRef={tagsRef}
          tabIndex={tagsOverflowed ? -1 : 0}
        />
      </div>
      {tagsOverflowed && (
        <button
          ref={overflowButtonRef}
          type="button"
          className={`${tagClass} pl-2 absolute`}
          style={{ left: overflowCountPosition }}
          onClick={() => {
            setTagsContainerExpanded(true);
          }}
        >
          +{overflowedTagsCount}
        </button>
      )}
    </div>
  );
});

export const NoteTagsDirective = toDirective<Props>(NoteTags);
