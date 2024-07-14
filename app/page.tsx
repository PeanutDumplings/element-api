export default function Home() {
    return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br bg-opacity-25 from-purple-500/20 to-indigo-500/20 ">
            <main className="flex flex-col items-center justify-center flex-1 p-24 text-center w-full gap-10">
                <h1 className="font-semibold text-8xl md:text-8xl mb-6">Elements API</h1>

                <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-[41rem] lg:grid-cols-2 lg:text-left">
                    <a
                        href="https://github.com/PeanutDumplings/element-api/blob/master/README.md"
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Documentation{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className="m-0 max-w-[20ch] text-sm opacity-50">Get information for each available endpoint</p>
                    </a>

                    <a
                        href={randomEndpoint()}
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h2 className="mb-3 text-2xl font-semibold">
                            Random Endpoint{" "}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        </h2>
                        <p className="m-0 max-w-[20ch] text-sm opacity-50">Click to visit a random endpoint!</p>
                    </a>
                </div>
            </main>
        </div>
    );
}

function randomEndpoint() {
    return "/api/random";
}
