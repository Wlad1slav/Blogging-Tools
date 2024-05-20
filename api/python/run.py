import uvicorn


def run():
    uvicorn.run("routes:app", host="127.0.0.1", port=8435, reload=True)


def application(environ, start_response):
    run()


if __name__ == "__main__":
    run()
