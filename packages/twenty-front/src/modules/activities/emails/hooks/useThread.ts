import { useRecoilState, useResetRecoilState } from 'recoil';

import { MockedThread } from '@/activities/emails/mocks/mockedThreads';
import { useOpenThreadRightDrawer } from '@/activities/emails/right-drawer/hooks/useOpenThreadRightDrawer';
import { viewableMessageThreadIdsFamilyState } from '@/activities/emails/state/viewableMessageThreadIdsFamilyState';
import { viewableThreadState } from '@/activities/emails/state/viewableThreadState';

export const useThread = () => {
  const [viewableThread, setViewableThread] =
    useRecoilState(viewableThreadState);

  const resetViewableMessageThread = useResetRecoilState(
    viewableMessageThreadIdsFamilyState(viewableThread?.id ?? ''),
  );

  const openThredRightDrawer = useOpenThreadRightDrawer();

  const openThread = (thread: MockedThread) => {
    if (viewableThread?.id !== thread.id) {
      resetViewableMessageThread();
    }

    openThredRightDrawer();

    setViewableThread(thread);
  };

  return {
    openThread,
  };
};
