import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Home from '../Home';
import Navbar from '../../components/Navbar';
import axios from "axios";

afterEach(() => {
    cleanup();
});


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

    it('Search input value', () => {
        render(<Navbar handleSearch={() => jest.fn()} />);
        const searchValue: any = screen.getByTestId('searchBar').querySelector('input');
        fireEvent.change(searchValue, { target: { value: "SearchData" } })
        expect(searchValue.value).toBe("SearchData")
    })

})

describe('on useEffect Call Api for data', () => {
    it("should return users list", async () => {
        await act(async () => {
            const responce = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0");
            expect(responce.data.hits).toBeDefined();
        })
    });
})


