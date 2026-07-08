import { useEffect, useState } from 'react';
import ProjectCards from '../components/ProjectCards';
import axios from 'axios';
import { ProSkel } from '../../loading/ProSkel';
import { CiCircleMore } from "react-icons/ci";
import { FaSearch } from 'react-icons/fa';
import CustomSelect from '../components/CustomSelect';

export const P_Project = () => {
  const [projects, setProjects] = useState([]);
  const [serverDown, setServerDown] = useState(false);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("views");
  const [order, setOrder] = useState("desc");
  const [dateRange, setDateRange] = useState("all");
  const [customDays, setCustomDays] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const maxRetries = 3;
      let attempt = 0;

      while (attempt < maxRetries) {
        try {
          const { data } = await axios.get(
            "http://localhost:3000/api/projects/gt",
            { timeout: 5000 }
          );

          setProjects(data.projects ?? []);
          setServerDown(false);
          setLoading(false);

          return; // success, stop retrying
        } catch (err) {
          attempt++;
          console.error(`Request failed. Attempt ${attempt}/${maxRetries}`);

          if (attempt < maxRetries) {
            // wait before trying again
            await new Promise(resolve =>{
              setTimeout(resolve, 1500)
            });
          }
        }
      }
      // only reached after all retries failed
      setServerDown(true);
          setLoading(false);
    };

    fetchProjects();
  }, []);

  // ---------- FILTER + SORT PIPELINE --------------
  const finalProjs = projects
    // SEARCH
    .filter((project) =>
      project.name.toLowerCase().includes(search.toLocaleLowerCase())
    )
    // DATE FILTER
    .filter((project) => {
      if (dateRange === "all") return true;

      const days = dateRange === "custom"
        ? Number(customDays)
        : Number(dateRange);

      // if custom is selected but no valid number entered,
      // dont filter anything yet
      if (!days || days <= 0) return true;

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);

      return new Date(project.repo_created_at) >= cutoff;
    })
    // SORT
    .sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sortBy === "views") {
        valA = a.views ?? 0;
        valB = b.views ?? 0;
      }
      else if (sortBy === "likes") {
        valA = a.likes ?? 0;
        valB = b.likes ?? 0;
      }
      else {
        valA = new Date(a.created_at).getTime();
        valB = new Date(b.created_at).getTime();
      }

      const result = valA - valB;

      return order === "asc" ? result : -result;
    });

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
    setMenuOpen(false);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
    setMenuOpen(false);
  };

  const handleDateRange = (e) => {
    const value = e.target.value;

    setDateRange(value);

    if (value !== "custom") {
      setCustomDays("");
      setMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // run once on mount (in case already large screen)
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return <ProSkel />;
  }

  return (
    <div className='w-full h-full'>
      <div className='text-green-400 w-full h-full flex flex-col'>

        <div className='flex p-2 gap-2'>

          <div className='w-full place-items-end'>
            <label htmlFor="searchP"></label>
            <div className='w-full md:w-[60%] lg:w-[70%] flex bg-zinc-800 rounded-2xl overflow-hidden'>
              <FaSearch className='ml-3 mt-2 text-xl text-white' />
              <input type="search" name="searchP" id="searchP" autoComplete='on'
                className='bg-transparent text-white outline-none border-none p-2 size-full ml-2 mr-2 rounded-2xl'
                placeholder='Search project...'
                value={search}
                onChange={handleSearch} />
            </div>
          </div>

          <div className='flex'>

            <button
              className='lg:hidden'
              aria-label='dropdown menu'
              onClick={() => setMenuOpen(prev => !prev)}>
              <CiCircleMore size={24} />
            </button>

            <div>
              {/* Desktop filters */}
              <div className='hidden lg:flex gap-2'>
                <CustomSelect
                  value={sortBy}
                  onChange={handleSortBy}
                  label="Sort By"
                  options={[
                    { value: "views", label: "Views" },
                    { value: "likes", label: "Likes" },
                  ]}
                />

                <CustomSelect
                  value={order}
                  onChange={handleOrder}
                  label="Order"
                  options={[
                    { value: "desc", label: "Descending" },
                    { value: "asc", label: "Ascending" },
                  ]}
                />

                <>
                  <CustomSelect
                    value={dateRange}
                    onChange={handleDateRange}
                    label="Date Range"
                    options={[
                      { value: "7", label: "Last 7 days" },
                      { value: "30", label: "Last 30 days" },
                      { value: "90", label: "Last 90 days" },
                      { value: "custom", label: "Custom..." },
                      { value: "all", label: "All Time" },
                    ]}
                  />
                </>

                {dateRange === "custom" && (
                  <input type="number" name="custo" id="custo"
                    min="1" placeholder='Enter days'
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    className='bg-zinc-800 rounded-md px-3 py-2 w-40'
                  />
                )}
              </div>

              {/* Mobi dropdown */}
              {menuOpen && (
                <div className='mob-select absolute right-0 top-15 bg-black border-green-500/50 shadow-lg border rounded-md p-2 z-50 flex flex-col gap-2'>
                  <CustomSelect
                    value={sortBy}
                    onChange={handleSortBy}
                    label="Sort By"
                    options={[
                      { value: "views", label: "Views" },
                      { value: "likes", label: "Likes" },
                    ]}
                  />

                  <CustomSelect
                    value={order}
                    onChange={handleOrder}
                    label="Order"
                    options={[
                      { value: "desc", label: "Descending" },
                      { value: "asc", label: "Ascending" },
                    ]}
                  />

                  <>
                    <CustomSelect
                      value={dateRange}
                      onChange={handleDateRange}
                      label="Date Range"
                      options={[
                        { value: "7", label: "Last 7 days" },
                        { value: "30", label: "Last 30 days" },
                        { value: "90", label: "Last 90 days" },
                        { value: "custom", label: "Custom..." },
                        { value: "all", label: "All Time" },
                      ]}
                    />
                  </>
                  {dateRange === "custom" && (
                    <input type="number" name="custo" id="custo"
                      min="1" placeholder='Enter days'
                      value={customDays}
                      onChange={(e) => setCustomDays(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setMenuOpen(false);
                        }
                      }}
                      className='bg-zinc-800 rounded-md px-3 py-2 w-40'
                    />
                  )}

                </div>
              )}
            </div>

          </div>

        </div>

        <div className='flex-1 overflow-hidden overflow-y-auto'>

          {serverDown ? (
            <div className='h-full flex items-center justify-center'>
              <div className='md:self-center'>
                <div className='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                  <p className='text-gray-400 font-bold'>Wait server is down!!!</p>
                </div>
              </div>
            </div>
          ) : finalProjs.length === 0 ? (
            <div className='h-full flex items-center justify-center'>
              <div className='md:self-center'>
                <div className='d_card flex flex-col gap-2 p-4 items-center rounded-2xl h-full'>
                  <p className='text-gray-400 font-bold'>No project found</p>
                </div>
              </div>
            </div>
          ) : (
            <div className='project_grid pt-2 pb-5 md:px-2'>
              {finalProjs.map((proj) => (
                <div
                  key={proj.id}
                  className='place-content-center'
                >
                  <ProjectCards
                    project={proj}
                  />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
