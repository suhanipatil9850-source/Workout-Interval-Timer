import time

print("Lap Stopwatch Started")
print("Press ENTER for lap | type 'stop' to end\n")

start = time.time()
lap = 1

while True:
    user = input()

    if user.lower() == "stop":
        break

    current = time.time() - start
    print(f"Lap {lap}: {round(current, 2)} sec")

    lap += 1

print("\nStopwatch ended.")
