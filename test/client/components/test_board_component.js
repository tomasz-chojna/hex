// A super simple DOM ready for React to render into
// Store this DOM and the window in global scope ready for React to access
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

import {expect} from 'chai';
import ReactTestUtils from 'react-dom/test-utils'
import React from "react";
import sinon from "sinon";
import proxyquire from "proxyquire";

describe('BoardComponent', () => {

    const raphaelStub = sinon.stub();

    const boardModule = proxyquire('../../../src/client/components/board', {
        'raphael': () => {
            return {
                path: (...args) => {
                    console.log('call', args);
                    const methods = {
                        attr: () => methods,
                        click: (fn) => fn.bind(methods)()
                    };

                    return methods;
                }
            }
        }
    });
    const GameBoardComponent = boardModule.GameBoardComponent;

    it('should generate a board', () => {
        /*
         <GameBoardComponent
         boardSize={11}
         tileBackground={'#fff'}
         tileOutline={'#000'}
         playerAColor={'#fd0006'}
         playerBColor={'#1533ad'}/>
         */
    });

    it('should not allow to make a move if currentMove is not set to playerId of the user', () => {

    });

    it('should not allow to make a move on the field that is already occupied', () => {

    });

    it('should allow to make a move if currentMove is set to playerID of the user', () => {

    });

    it('should render all moves from the game session on board on first load', () => {

    });

    it('should respond to updates in game session by rendering incoming moves', () => {

    });

    it('should change tile background on hover-in event', () => {

    });

    it('should revert tile background to default on hover-out event', () => {

    });

});