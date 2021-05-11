import { AppState } from '@/ui_models/app_state';
import { Icon } from './Icon';
import { Switch } from './Switch';
import { observer } from 'mobx-react-lite';
import { useRef, useState, useEffect } from 'preact/hooks';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure';
import { SNNote } from '@standardnotes/snjs/dist/@types';

type Props = {
  appState: AppState;
  closeOnBlur: (event: { relatedTarget: EventTarget | null }) => void;
  onSubmenuChange?: (submenuOpen: boolean) => void;
};

const MAX_TAGS_MENU_HEIGHT = 320;

export const NotesOptions = observer(
  ({ appState, closeOnBlur, onSubmenuChange }: Props) => {
    const [tagsMenuOpen, setTagsMenuOpen] = useState(false);
    const [tagsMenuPosition, setTagsMenuPosition] = useState({
      top: 0,
      right: 0,
    });

    const toggleOn = (condition: (note: SNNote) => boolean) => {
      const notesMatchingAttribute = notes.filter(condition);
      const notesNotMatchingAttribute = notes.filter((note) => !condition(note));
      return (notesMatchingAttribute.length > notesNotMatchingAttribute.length);
    };

    const notes = Object.values(appState.notes.selectedNotes);
    const hidePreviews = toggleOn(note => note.hidePreview);
    const locked = toggleOn(note => note.locked);
    const protect = toggleOn(note => note.protected);
    const archived = notes.some((note) => note.archived);
    const unarchived = notes.some((note) => !note.archived);
    const trashed = notes.some((note) => note.trashed);
    const notTrashed = notes.some((note) => !note.trashed);
    const pinned = notes.some((note) => note.pinned);
    const unpinned = notes.some((note) => !note.pinned);

    const tagsButtonRef = useRef<HTMLButtonElement>();

    const iconClass = 'fill-current color-neutral mr-2';
    const buttonClass =
      'flex items-center border-0 focus:inner-ring-info ' +
      'cursor-pointer hover:bg-contrast color-text bg-transparent px-3 ' +
      'text-left';

    useEffect(() => {
      if (onSubmenuChange) {
        onSubmenuChange(tagsMenuOpen);
      } 
    }, [tagsMenuOpen, onSubmenuChange]);

    return (
      <>
        <Switch
          onBlur={closeOnBlur}
          className="px-3 py-1.5"
          checked={locked}
          onChange={() => {
            appState.notes.setLockSelectedNotes(!locked);
          }}
        >
          <span className="flex items-center">
            <Icon type="pencil-off" className={iconClass} />
            Prevent editing
          </span>
        </Switch>
        <Switch
          onBlur={closeOnBlur}
          className="px-3 py-1.5"
          checked={!hidePreviews}
          onChange={() => {
            appState.notes.setHideSelectedNotePreviews(!hidePreviews);
          }}
        >
          <span className="flex items-center">
            <Icon type="rich-text" className={iconClass} />
            Show preview
          </span>
        </Switch>
        <Switch
          onBlur={closeOnBlur}
          className="px-3 py-1.5"
          checked={protect}
          onChange={() => {
            appState.notes.setProtectSelectedNotes(!protect);
          }}
        >
          <span className="flex items-center">
            <Icon type="password" className={iconClass} />
            Protect
          </span>
        </Switch>
        <div className="h-1px my-2 bg-border"></div>
        {appState.tags.tagsCount > 0 && (
          <Disclosure
            open={tagsMenuOpen}
            onChange={() => {
              const buttonRect = tagsButtonRef.current.getBoundingClientRect();
              const { offsetTop, offsetWidth } = tagsButtonRef.current;
              setTagsMenuPosition({
                top: offsetTop,
                right:
                  buttonRect.right + MAX_TAGS_MENU_HEIGHT > document.body.clientWidth
                    ? offsetWidth
                    : -offsetWidth,
              });
              setTagsMenuOpen(!tagsMenuOpen);
            }}
          >
            <DisclosureButton
              onKeyUp={(event) => {
                if (event.key === 'Escape') {
                  setTagsMenuOpen(false);
                }
              }}
              onBlur={closeOnBlur}
              ref={tagsButtonRef}
              className={`${buttonClass} py-1.5 justify-between`}
            >
              <div className="flex items-center">
                <Icon type="hashtag" className={iconClass} />
                {'Add tag'}
              </div>
              <Icon
                type="chevron-right"
                className="fill-current color-neutral"
              />
            </DisclosureButton>
            <DisclosurePanel
              onKeyUp={(event) => {
                if (event.key === 'Escape') {
                  setTagsMenuOpen(false);
                  tagsButtonRef.current.focus();
                }
              }}
              style={{
                ...tagsMenuPosition,
              }}
              className="sn-dropdown sn-dropdown-anchor-right flex flex-col py-2 max-h-80 overflow-y-scroll"
            >
              {appState.tags.tags.map((tag) => (
                <button
                  key={tag.title}
                  className={`${buttonClass} py-2`}
                  onBlur={closeOnBlur}
                  onClick={() => {
                    appState.notes.isTagInSelectedNotes(tag)
                      ? appState.notes.removeTagFromSelectedNotes(tag)
                      : appState.notes.addTagToSelectedNotes(tag);
                  }}
                >
                  <span className={appState.notes.isTagInSelectedNotes(tag) ? 'font-bold' : ''}>
                    {tag.title}
                  </span>
                </button>
              ))}
            </DisclosurePanel>
          </Disclosure>
        )}
        {unpinned && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={() => {
              appState.notes.setPinSelectedNotes(true);
            }}
          >
            <Icon
              type="pin"
              className={iconClass}
            />
            Pin to top
          </button>
        )}
        {pinned && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={() => {
              appState.notes.setPinSelectedNotes(false);
            }}
          >
            <Icon
              type="unpin"
              className={iconClass}
            />
            Unpin
          </button>
        )}
        {unarchived && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={() => {
              appState.notes.setArchiveSelectedNotes(true);
            }}
          >
            <Icon
              type="archive"
              className={iconClass}
            />
            Archive
          </button>
        )}
        {archived && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={() => {
              appState.notes.setArchiveSelectedNotes(false);
            }}
          >
            <Icon
              type="unarchive"
              className={iconClass}
            />
            Unarchive
          </button>
        )}
        {notTrashed && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={async () => {
              await appState.notes.setTrashSelectedNotes(true);
            }}
          >
            <Icon type='trash' className={iconClass} />
            Move to Trash
          </button>
        )}
        {trashed && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={async () => {
              await appState.notes.setTrashSelectedNotes(false);
            }}
          >
            <Icon type='restore' className={iconClass} />
            Restore
          </button>
        )}
        {appState.selectedTag?.isTrashTag && (
          <button
            onBlur={closeOnBlur}
            className={`${buttonClass} py-1.5`}
            onClick={async () => {
              await appState.notes.deleteNotesPermanently();
            }}
          >
            <Icon type="close" className="fill-current color-danger mr-2" />
            <span className="color-danger">Delete permanently</span>
          </button>
          )}
      </>
    );
  }
);
