<div class="top_bar">
    <div class="flex items-center gap-4">
        <button type="button" id="menuBtn"
            class="menuBtn lg:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle menu" aria-expanded="false"
            aria-controls="sidebar sidebar_overlay">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
        </button>
        <p class="logoName">Draco Ghost</p>
    </div>

    <div id="sidebarNav" class="hidden lg:flex shrink-0 ">
        <?php include "includes/sidebar.php"; ?>
    </div>

    <div class="logo shrink-0">
        <div class="logo_ring">
            <img src="/assets/images/dragon_logo.webp" alt="draco_logo">
        </div>
    </div>
</div>

<!-- MOBILE/TABLET (Below lg): Backdrop Overlay -->
<div id="sidebar_overlay"
    class="fixed inset-0 z-40 hidden bg-black/50 lg:hidden 
    transition-opacity duration-300"></div>

<!-- MOBILE/TABLET (Below lg): Slide-out Sidebar Drawer -->
<aside id="sidebar"
    class="fixed top-12 bottom-0 left-0 z-50 w-2/3 md:w-2/6
        -translate-x-full overflow-y-auto
        backdrop-blur-2xl transition-transform duration-300
        lg:hidden">

    <div class="p-4">
        <?php include "includes/sidebar.php"; ?>
    </div>

</aside>