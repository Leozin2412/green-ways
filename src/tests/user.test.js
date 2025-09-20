import { describe, test, beforeEach, assert, it } from "poku";
import { deepStrictEqual, strictEqual, ok} from 'node:assert';
import Sinon from "sinon";

import { loadPosts } from 'postRepository.js';
import {promise as conexao} from "../database/conexao.js";


