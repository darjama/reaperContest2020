import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../common/Hero';
import { useHistory } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Results from '../Results/Results';
import '/src/css/archive.css';

// Number of contests rendered per lazy-loading batch.
const PAGE_SIZE = 6;

// Delay before the search is applied while the user is typing.
const SEARCH_DEBOUNCE_MS = 300;

const Archive = function (props) {
  const [contestList, setContestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveContest, setArchiveContest] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);
  // re-renders when the date/contest phase changes so contest availability
  // is re-evaluated while the app stays open
  const now = useSelector((state) => state.nowReducer);
  const history = useHistory();

  // Every word in the search has to appear somewhere in the contest details.
  const searchTerms = debouncedSearchTerm
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const filteredContests = searchTerms.length
    ? contestList.filter((contest) => {
        const haystack = [
          contest.contestlabel,
          contest.songname,
          contest.artist,
          contest.description,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchTerms.every((term) => haystack.includes(term));
      })
    : contestList;

  const updateAC = function (id) {
    if (id === '0' || id === 0) return;
    setArchiveContest(id);
    history.push('/archive?id=' + id);
  };

  const showContestList = function () {
    setArchiveContest(undefined);
    history.push('/archive');
  };

  const updateSearch = function (value) {
    setSearchTerm(value);
    if (value === '') {
      setDebouncedSearchTerm('');
      setVisibleCount(PAGE_SIZE);
    }
  };

  // Only apply the search after the user pauses typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setVisibleCount(PAGE_SIZE);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    document.title = 'reaMIXed: Archive';
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get('/api/contestnames/')
      .then(({ data }) => {
        if (cancelled) return;
        setContestList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!contestList.length) return;
    const searchParams = new URLSearchParams(props.location.search);
    let params = Number(searchParams.get('id'));
    let shp = searchParams.get('sh');
    if (
      params &&
      (contestList.some(
        (a) =>
          a.contestid === params &&
          a.resultdate &&
          new Date(a.resultdate) < new Date(now)
      ) ||
        shp === 'test093')
    ) {
      setArchiveContest(params);
    } else {
      setArchiveContest(undefined);
    }
  }, [contestList, props.location.search, now]);

  // Load the next batch whenever the sentinel at the bottom of the list
  // scrolls into view.
  useEffect(() => {
    if (archiveContest || loading) return;
    if (visibleCount >= filteredContests.length) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + PAGE_SIZE, filteredContests.length)
          );
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [archiveContest, loading, visibleCount, filteredContests.length]);

  const loadMore = function () {
    setVisibleCount((count) =>
      Math.min(count + PAGE_SIZE, filteredContests.length)
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Hero name='Contest Archives' />

      {archiveContest ? (
        <div>
          <Button
            variant='outline-light'
            style={{ margin: '10px' }}
            onClick={showContestList}
          >
            &#8592; All contests
          </Button>
          <Results contestid={archiveContest} />
        </div>
      ) : (
        <div className='archive'>
          <Form
            className='archive-search'
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type='search'
              className='archive-search__input'
              placeholder='Search by song, artist, contest or description'
              aria-label='Search contests'
              autoComplete='off'
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
            />
            {searchTerm && (
              <Button
                type='button'
                variant='outline-light'
                onClick={() => updateSearch('')}
              >
                Clear
              </Button>
            )}
          </Form>

          {loading ? (
            <Spinner animation='border' variant='light' />
          ) : (
            <>
              <p className='archive-search__count'>
                {searchTerms.length
                  ? `${filteredContests.length} of ${
                      contestList.length
                    } contests match "${debouncedSearchTerm.trim()}"`
                  : `${contestList.length} contests`}
              </p>

              {filteredContests.length === 0 ? (
                <div className='archive-empty'>
                  <p>No contests match "{debouncedSearchTerm.trim()}".</p>
                  <Button
                    type='button'
                    variant='outline-light'
                    onClick={() => updateSearch('')}
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className='archive-list'>
                  {filteredContests.slice(0, visibleCount).map((contest) => {
                    const resultDate = contest.resultdate
                      ? new Date(contest.resultdate)
                      : null;
                    const available = resultDate
                      ? resultDate <= new Date(now)
                      : false;
                    return (
                      <article
                        key={contest._id}
                        className={
                          'archive-item' +
                          (available ? '' : ' archive-item--disabled')
                        }
                        role={available ? 'button' : undefined}
                        tabIndex={available ? 0 : undefined}
                        onClick={() =>
                          available && updateAC(contest.contestid)
                        }
                        onKeyDown={(e) => {
                          if (
                            available &&
                            (e.key === 'Enter' || e.key === ' ')
                          ) {
                            e.preventDefault();
                            updateAC(contest.contestid);
                          }
                        }}
                      >
                        {contest.artistimg ? (
                          <img
                            className='archive-item__image'
                            src={contest.artistimg}
                            alt={contest.artist}
                            loading='lazy'
                          />
                        ) : (
                          <div className='archive-item__image archive-item__image--placeholder'>
                            No artist image
                          </div>
                        )}
                        <div className='archive-item__body'>
                          <div className='archive-item__heading'>
                            <span className='archive-item__label'>
                              {contest.contestlabel}
                            </span>
                            <span className='archive-item__status'>
                              {available
                                ? 'View results'
                                : resultDate
                                ? 'Results available ' +
                                  resultDate.toLocaleDateString()
                                : 'Results pending'}
                            </span>
                          </div>
                          <h3 className='archive-item__title'>
                            {contest.songname} by {contest.artist}
                          </h3>
                          {contest.description && (
                            <p className='archive-item__description'>
                              {contest.description}
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}

                  {visibleCount < filteredContests.length && (
                    <div ref={sentinelRef} className='archive-sentinel'>
                      {typeof IntersectionObserver === 'undefined' ? (
                        <Button variant='outline-light' onClick={loadMore}>
                          Load more contests
                        </Button>
                      ) : (
                        <>
                          <Spinner
                            animation='border'
                            variant='light'
                            size='sm'
                          />{' '}
                          Loading more contests...
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Archive;
