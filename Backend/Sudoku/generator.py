import random
import datetime
from .solution import Solution


class SudokuGenerator:
    def __init__(self, level):
        self.board = [[0 for _ in range(9)] for _ in range(9)]
        self.archive = []
        self.level = level

        shuffled_list0 = self.get_shuffled_list(9)
        shuffled_list4 = self.get_shuffled_list(9)
        shuffled_list8 = self.get_shuffled_list(9)

        queue1 = []
        queue2 = []
        queue3 = []

        for ind_m in range(9):

            for ind_n in range(9):
                block_number = 3 * (ind_m // 3) + ind_n // 3
                index_in_block = 3 * (ind_m % 3) + ind_n % 3

                if block_number == 0:
                    self.board[ind_m][ind_n] = shuffled_list0[index_in_block]
                elif block_number == 4:
                    self.board[ind_m][ind_n] = shuffled_list4[index_in_block]
                elif block_number == 8:
                    self.board[ind_m][ind_n] = shuffled_list8[index_in_block]
                else:
                    main_index = 9 * (3 * (ind_m // 3) + ind_n // 3) + 3 * (ind_m % 3) + ind_n % 3
                    self.board[ind_m][ind_n] = 0

                    if block_number == 2 or block_number == 6:
                        queue1.append(main_index)
                    elif index_in_block == 4 or index_in_block == block_number or index_in_block + block_number == 8:
                        queue2.append(main_index)
                    else:
                        queue3.append(main_index)

        shuffled_list = self.shuffle(queue2) + self.shuffle(queue1) + self.shuffle(queue3)

        for block_in_block in shuffled_list:
            block = block_in_block // 9
            in_block = block_in_block % 9

            row = 3 * (block // 3) + in_block // 3
            column = 3 * (block % 3) + in_block % 3

            curr_set = set([1 + elem2 for elem2 in range(9)])
            for ind_w in range(9):
                from_row_excl = [self.board[row][ind_w]]
                curr_set = curr_set.difference(set(from_row_excl))

                from_column_excl = [self.board[ind_w][column]]
                curr_set = curr_set.difference(set(from_column_excl))

                pos_to_pop = 9 * block + ind_w
                block_to_pop = pos_to_pop // 9
                in_block_to_pop = pos_to_pop % 9

                row_to_pop = 3 * (block_to_pop // 3) + in_block_to_pop // 3
                col_to_pop = 3 * (block_to_pop % 3) + in_block_to_pop % 3

                from_block_excl = [self.board[row_to_pop][col_to_pop]]
                ex_set = set(from_block_excl)
                curr_set = curr_set.difference(ex_set)

            curr_set_list = list(curr_set)
            lng = len(curr_set_list) - 1

            if lng == 0:
                break
            else:
                try:
                    curr_digit = random.randint(0, lng)
                    curr_digit = random.sample(curr_set_list, len(curr_set_list))[curr_digit]
                    self.archive.append(((row, column), curr_digit))
                    self.board[row][column] = curr_digit
                except ValueError:
                    break

        sol = Solution(self.board)

        board_generated = False
        current_result = []

        while not board_generated:
            sol1 = sol.try_to_decide_main(sol.board)
            board_info = sol.get_board_info(sol1)

            if board_info[1] == 0:
                current_result = sol.get_solve_array(sol1)
                if len(current_result) != 0 and len(self.archive) != 0:
                    board_generated = True
                else:
                    tpl = self.archive.pop()
                    sol.board[tpl[0][0]][tpl[0][1]] = '.'
            else:
                tpl = self.archive.pop()
                sol.board[tpl[0][0]][tpl[0][1]] = '.'

        generated_result = random.sample(current_result, 1)
        for iii, row in enumerate(generated_result[0]):
            for jjj, cel_el in enumerate(row):
                self.board[iii][jjj] = str(cel_el)

        shuffled_list = self.get_shuffled_list(81)
        stop_test = False
        iters = 0
        fails = 0
        successes = 0

        while not stop_test:
            current_index = shuffled_list[0]
            shuffled_list = shuffled_list[1:]
            block_in_block = current_index - 1

            block = block_in_block // 9
            in_block = block_in_block % 9

            row = 3 * (block // 3) + in_block // 3
            column = 3 * (block % 3) + in_block % 3

            old_value = self.board[row][column]
            self.board[row][column] = '.'
            sol = Solution(self.board)

            solution_is_only = sol.solution_0_level_is_only(sol.board)
            iters += 1

            if solution_is_only:
                successes += 1
            elif iters >= 35 and self.level >= 2:
                solution_is_only = sol.solution_1_level_is_only(sol.board)
                if solution_is_only:
                    successes += 1
                else:
                    shuffled_list = shuffled_list + [current_index]
                    fails += 1
                    self.board[row][column] = old_value
            else:
                shuffled_list = shuffled_list + [current_index]
                fails += 1
                self.board[row][column] = old_value

            if self.level == 1:
                stop_test_level = (iters == 60)
            elif self.level == 2:
                stop_test_level = (iters == 70)

            if fails + successes == 80 or stop_test_level:
                stop_test = True

    def get_shuffled_list(self, list_lng):
        shuffled_list = list([1 + elem for elem in range(list_lng)])
        return self.shuffle(shuffled_list)

    @staticmethod
    def shuffle(current_list):
        return random.sample(current_list, len(current_list))
