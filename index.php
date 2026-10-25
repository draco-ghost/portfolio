<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="icon" type="image/svg+xml" href="/assets/images/dragon_logo.webp" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <title>Portfolio</title>
    <link rel="stylesheet" type="text/css" href="/assets/css/output.css">
</head>

<body class="w-full min-w-[320px] h-dvh max-h-dvh mx-auto
    flex flex-col overflow-hidden text-green-500 bg-linear-to-br from-black to-green-900
">
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
        <div class="logo_bottom">
            <img src="/assets/images/dragon_logo_p.webp"
            alt="dragon_logo_p"
            class="w-full h-full">
        </div>
    </div>

    <div class="home_overlay w-full h-full flex flex-col place-items-center">
        <div id="layout"
            class="relative z-10 w-full h-full max-w-384 min-h-0
                mx-auto flex flex-col overflow-hidden">

            <div class="h-12 shrink-0">
                <?php include "includes/topbar.php"; ?>
            </div>

            <div class="relative flex flex-1 min-h-0 lg:grid lg:grid-cols-[20%_80%]">
                <div id="sidebar_overlay" class="fixed inset-0 z-40 hidden bg-black/50 lg:hidden">
                </div>

                <aside id="sidebar"
                    class="fixed top-12 bottom-0 left-0 z-50 w-2/3 md:w-2/6
                    -translate-x-full overflow-y-auto
                    backdrop-blur-2xl transition-transform duration-300
                    lg:static lg:w-auto lg:translate-x-0 lg:backdrop-blur-none">

                    <?php include "includes/sidebar.php"; ?>

                </aside>

                <main class="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden p-[clamp(0.5rem,1vw,2rem)]">

                    <section id="app" class="flex-1 min-h-0 font-bold">

                    </section>
                </main>
            </div>

        </div>
    </div>

    <?php
    require_once __DIR__ . '/utils/config.php';
    ?>

    <script>
        window.APP_CONFIG =
            <?= json_encode([
                'linkedinUrl' => $LINKED_IN_URL,
                'linkedinAppUrl' => $LINKEDIN_APP_URL,

                'githubUrl' => $GITHUB_URL,

                'facebookUrl' => $FACEBOOK_URL,
                'facebookAppUrl' => $FACEBOOK_APP_URL,

                'kofiUrl' => $KOFI,
            ]) ?>;
    </script>

    <script src="/assets/js/app.js"></script>
</body>

</html>