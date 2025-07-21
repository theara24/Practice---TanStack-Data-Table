import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { RootState, AppDispatch } from "./store"

// Instead of using regular useDispatch, we use this typed version
// It's like having a smart assistant that knows what actions are available
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Instead of regular useSelector, we use this typed version
// It's like having a smart way to read data from our store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// WHY DO WE NEED THESE?
// - They give us autocomplete when coding
// - They prevent typing mistakes
// - They make our code safer and easier to write