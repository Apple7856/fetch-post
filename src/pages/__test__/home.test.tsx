import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../Home';


describe("Home Component", () => {

    test("Heading Testing", () => {
        const home = render(<Home />);
        const serialNo = home.getByTestId('serialNo');
        expect(serialNo.innerHTML).toBe('Sr. No.');
    })

    test("Table Row Testing", () => {
        const { getByTestId } = render(<Home />);
        const tableRow = getByTestId('tableRow');
        expect(tableRow.children.length).toBe(5);
    })

    test("Match SnapShot", () => {
        const component = renderer.create(<Home />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })

})
